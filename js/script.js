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
/* program code */
function generateTitleLinks(customSelector = '') {
  console.log(customSelector)
  /* [DONE] remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles=document.querySelectorAll(optArticleSelector + customSelector);
  let html='';
  for (let article of articles){
    // console.log(article);
    /* [DONE] get the article id */
    const articleId=article.getAttribute('id');
    // console.log(articleId);
    /* [DONE] find the title element */
    const articleTitle=article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);
    /* [DONE] create HTML of the link */
    const linkHTML='<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);
    /* [DONE] get the title from the title element */
    titleList.innerHTML=titleList.innerHTML+linkHTML;
    /* [DONE] insert link into titleList */
    html=html+linkHTML;
    // console.log(html);
  }
  titleList.innerHTML=html;
  const links=document.querySelectorAll('.titles a');
  // console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
const titleClickHandler=function(event){
  event.preventDefault();
  const clickedElement=this;
  // console.log('Link was clicked!');
  // console.log(event);
  /* [DONE] remove class 'active' from all article links */
  const activeLinks=document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);
  /* [DONE] remove class 'active' from all articles */
  const activeArticles=document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector=clickedElement.getAttribute('href');
  // console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle=document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
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
    // console.log(tag + ' is used ' + tags[tag] + ' times');
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
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles=document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    // console.log(article);
    /* [DONE] find tags wrapper */
    const tagsWrapper=article.querySelector(optArticleTagsSelector);
    // console.log(tagsWrapper);
    /* [DONE] make html variable with empty string */
    let html='';
    /* [DONE] get tags from data-tags attribute */
    const articleTags=article.getAttribute('data-tags');
    // console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      // console.log(tag);
      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      // console.log(tagHTML);
      /* [DONE] add generated code to html variable */
      html=html+tagHTML;
      // console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ')' + '</a></li>';
    // console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    tagList.innerHTML = allTagsHTML;
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
}
generateTags();
function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement=this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */
  const activeTagLinks=document.querySelectorAll('.post-tags a.active');
  // console.log(activeTagLinks);
  /* [DONE] START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks=document.querySelectorAll('a[href="' + href + '"]');
  // console.log(tagLinks);
  /* [DONE] START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* [DONE] add class active */
    tagLink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a, .list.tags a');
  /* [DONE] START LOOP: for each link */
  for(let tagLink of tagLinks) {
    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();
function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    // console.log(article);
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    // console.log(authorWrapper);
    const articleAuthor = article.getAttribute('data-author');
    // console.log(articleAuthor);
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    authorWrapper.innerHTML = linkHTML;
  }
  const authorList = document.querySelector(optAuthorsListSelector);
  const authorParams = calculateTagsParams(allAuthors);
  // console.log('tagsParams:', authorParams);
  let allAuthorsHTML = '';
  for (let author in allAuthors) {
    const authorLinkHTML = '<li><a href="#author-' + author + '" class="' + calculateTagClass(allAuthors[author], authorParams) + '">' + author + ' (' + allAuthors[author] + ')' + '</a></li>';
    // console.log('tagAuthorHTML:', authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
  // console.log(activeAuthorLinks);
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  // console.log(author);
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a, .authors a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();