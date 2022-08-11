'use strict';

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
    optArticleAuthorSelector = '.post-author';


function generateTitleLinks(customSelector = '') {
    // clear title list
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articleList = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articleList) {
        const articleID = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const htmlElement = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
        html += htmlElement;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}


generateTitleLinks();


function generateTags() {
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
            const singularTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>\n';
            html += singularTag;
        }
        wrapper.innerHTML = html;
    }
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
        console.log(tag);
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll(optArticleTagsSelector + ' a');
    for (let link of tagLinks) {
        link.addEventListener('click', tagClickHandler);
    }
}


addClickListenersToTags();


function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const author = article.querySelector(optArticleAuthorSelector).innerHTML.substring(3);
        article.setAttribute('data-author', author);
    }
    const authors = document.querySelectorAll(optArticleAuthorSelector);
    for (let author of authors) {
        author.innerHTML = '';
    }

}

generateAuthors();

