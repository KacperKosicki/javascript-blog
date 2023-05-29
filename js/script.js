'use strict';
const optArticleSelector = '.post';
const optTitleSelector='.post-title';
const optTitleListSelector='.titles';
const optArticleTagsSelector = '.post-tags .list';
function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles=document.querySelectorAll(optArticleSelector);
  let html='';
  for (let article of articles){
    console.log(article);
    /* [DONE] get the article id */
    const articleId=article.getAttribute('id');
    console.log(articleId);
    /* [DONE] find the title element */
    const articleTitle=article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* [DONE] create HTML of the link */
    const linkHTML='<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* [DONE] get the title from the title element */
    titleList.innerHTML=titleList.innerHTML+linkHTML;
    /* [DONE] insert link into titleList */
    html=html+linkHTML;
    console.log(html);
  }
  titleList.innerHTML=html;
  const links=document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
const titleClickHandler=function(event){
  event.preventDefault();
  const clickedElement=this;
  console.log('Link was clicked!');
  console.log(event);
  /* [DONE] remove class 'active' from all article links */
  const activeLinks=document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  /* [DONE] remove class 'active' from all articles */
  const activeArticles=document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector=clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle=document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};
generateTitleLinks();
function generateTags(){
  /* [DONE] find all articles */
  const articles=document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){
    console.log(article);
    /* [DONE] find tags wrapper */
    const tagsWrapper=document.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* [DONE] make html variable with empty string */
    let html='';
    /* [DONE] get tags from data-tags attribute */
    const articleTags=article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log(tag);
      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* [DONE] add generated code to html variable */
      html=html+tagHTML;
      console.log(html);
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    generateTags();
  /* [DONE] END LOOP: for every article: */
  }
}
generateTags();