'use strict';

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloud: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
    authorList: Handlebars.compile(document.querySelector('#template-author-list').innerHTML)
};


function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts .post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    const elementAttribute = clickedElement.getAttribute('href');
    const articleID = elementAttribute.substring(1);
    const activeArticle = document.getElementById(articleID);
    activeArticle.classList.add('active');
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors';


function generateTitleLinks(customSelector = '') {
    // clear title list
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articleList = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articleList) {
        const articleID = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const htmlElementData = { id: articleID, title: articleTitle };
        const htmlElement = templates.articleLink(htmlElementData);
        html += htmlElement;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}


generateTitleLinks();


function calculateTagsParams(tags) {
    let min, max;
    for (let tag in tags) {
        min = tags[tag];
        max = tags[tag];
        break;
    }
    for (let tag in tags) {
        if (tags[tag] > max) {
            max = tags[tag];
        } else if (tags[tag] < min) {
            min = tags[tag];
        }
    }
    const params = {};
    params.max = max;
    params.min = min;
    return params;
}


function calculateTagClass(count, params) {
    const range = params.max - params.min;
    const interval = range / optCloudClassCount;
    let tagClass = 1;
    let lowestValue = params.min;
    for (let i = 0; i < optCloudClassCount; i++) {
        lowestValue += interval;
        if (count <= lowestValue) {
            return tagClass;
        } else {
            tagClass += 1;
        }
    }
    return optCloudClassCount;
}


function generateTags() {
    const allTags = {};
    const exampleTags = document.querySelectorAll(optArticleTagsSelector);
    for (let tags of exampleTags) {
        tags.innerHTML = '';
    }
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const wrapper = article.querySelector('.list');
        let html = '';
        const tagsArray = article.getAttribute('data-tags').split(' ');
        for (let tag of tagsArray) {
            const singularTagData = { tagname: tag };
            const singularTag = templates.tagLink(singularTagData);
            if (!allTags.hasOwnProperty(tag)) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            html += singularTag;
        }
        wrapper.innerHTML = html;
    }
    const tagList = document.querySelector(optTagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    let allTagsData = { prefix: optCloudClassPrefix, tags: {} };
    for (let tag in allTags) {
        allTagsData.tags[tag] = calculateTagClass(allTags[tag], tagsParams);
    }
    tagList.innerHTML = templates.tagCloud(allTagsData);
}


generateTags();


function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.substring(5);
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let tag of activeTags) {
        tag.classList.remove('active');
    }
    const sameTags = document.querySelectorAll('a[href="' + href + '"]');
    for (let tag of sameTags) {
        tag.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll(optArticleTagsSelector + ' a');
    for (let link of tagLinks) {
        link.addEventListener('click', tagClickHandler);
    }
    const tagCloud = document.querySelectorAll(optTagsListSelector + ' a');
    for (let link of tagCloud) {
        link.addEventListener('click', tagClickHandler);
    }
}


addClickListenersToTags();


function generateAuthors() {
    const allAuthors = [];
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const author = article.querySelector(optArticleAuthorSelector).innerHTML.substring(3);
        article.setAttribute('data-author', author);
        if (allAuthors.indexOf(author) === -1) {
            allAuthors.push(author);
        }
    }

    const authors = document.querySelectorAll(optArticleAuthorSelector);
    for (let author of authors) {
        author.innerHTML = '';
    }

    for (let article of articles) {
        const authorWrapper = article.querySelector(optArticleAuthorSelector);
        const author = article.getAttribute('data-author');
        const authorWithDash = author.replace(' ', '-');
        const authorLinkData = { authorLink: authorWithDash, author: author };
        const authorLink = templates.authorLink(authorLinkData);
        authorWrapper.innerHTML = authorLink;
    }

    let htmlData = { authors: {} };
    for (let author of allAuthors) {
        const authorWithDash = author.replace(' ', '-');
        htmlData.authors[author] = authorWithDash;
    }
    const html = templates.authorList(htmlData);
    const authorList = document.querySelector(optAuthorsListSelector);
    authorList.innerHTML = html;
}


generateAuthors();


function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.substring(8).replace('-', ' ');
    generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
    for (let link of authorLinks) {
        link.addEventListener('click', authorClickHandler);
    }
    const authorList = document.querySelectorAll(optAuthorsListSelector + ' a');
    for (let link of authorList) {
        link.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors();
