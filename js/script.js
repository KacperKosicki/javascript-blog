/* Handlebars */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}
'use strict';
/* all const for program use */
const optArticleSelector = '.post';
const optTitleSelector='.post-title';
const optTitleListSelector='.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optAuthorsListSelector = '.list.authors';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
function generateTitleLinks(customSelector = '') {
  console.log(customSelector)
  const titleList=document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles=document.querySelectorAll(optArticleSelector + customSelector);
  let html='';
  for (let article of articles){
    const articleId=article.getAttribute('id');
    const articleTitle=article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.innerHTML=titleList.innerHTML+linkHTML;
    html=html+linkHTML;
  }
  titleList.innerHTML=html;
  const links=document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
const titleClickHandler=function(event){
  event.preventDefault();
  const clickedElement=this;
  const activeLinks=document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles=document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector=clickedElement.getAttribute('href');
  const targetArticle=document.querySelector(articleSelector);
  targetArticle.classList.add('active');
};
generateTitleLinks();
function calculateTagsParams(tags){
  const params = {
    min: 999999,
    max: 0
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}
function generateTags(){
  let allTags = {};
  const articles=document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const tagsWrapper=article.querySelector(optArticleTagsSelector);
    let html='';
    const articleTags=article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray){
      const tagHTMLData = {id: tag, title: tag};
      const tagHTML = templates.articleTagLink(tagHTMLData);
      //const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      html=html+tagHTML;
      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  for(let tag in allTags){
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
}
generateTags();
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement=this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks=document.querySelectorAll('.post-tags a.active');
  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }
  const tagLinks=document.querySelectorAll('a[href="' + href + '"]');
  for(let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.post-tags a, .list.tags a');
  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();
function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    const authorHTMLData = {id: articleAuthor, title: articleAuthor};
    const linkHTML = templates.articleAuthorLink(authorHTMLData);
    //const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    authorWrapper.innerHTML = linkHTML;
  }
  const authorList = document.querySelector(optAuthorsListSelector);
  const authorParams = calculateTagsParams(allAuthors);
  const allAuthorsData = {authors: []};
  for (let author in allAuthors) {
    const authorLinkHTML = '<li><a href="#author-' + author + '" class="' + calculateTagClass(allAuthors[author], authorParams) + '">' + author + ' (' + allAuthors[author] + ')' + '</a></li>';
    allAuthorsData.authors.push({
      tag: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorParams)
    });
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}
generateAuthors();
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a, .authors a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();