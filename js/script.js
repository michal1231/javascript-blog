'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const elementAttribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const articleID = elementAttribute.substring(1);

    /* add class 'active' to the correct article */
    const activeArticle = document.getElementById(articleID);
    activeArticle.classList.add('active');
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    /* get the article id */

    const articleList = document.querySelectorAll(optArticleSelector);
    let html = '';

    for (let article of articleList) {
        const articleID = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const htmlElement = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
        html += htmlElement;
        console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }


    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();

