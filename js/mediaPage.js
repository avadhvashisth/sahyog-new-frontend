//import * as commonFun from './common.js';
const baseURL = "https://swwdc.herokuapp.com/";

function showLoader(){
  $('#ftco-loader').addClass('show');
}

function hideLoader(){
  $('#ftco-loader').removeClass('show');
}

function loadData() {
  showLoader();
  $.ajax({url: `${baseURL}media`, success: function(result){

    setInnerHtml("header->name", result);
    let imgUrl = result['header']['img'];
    $("#header-img").attr("style", `background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.75),rgba(255, 255, 255, 0.75)),url(${imgUrl})`);

    setInnerHtml("heading", result);
    setImages("images", result['images']);


    //footer
    setInnerHtml("footer->p", result);
    $("#footer-img").attr("src", result['footer']['img']);
    setInnerHtml("footer->address->l1", result);
    setInnerHtml("footer->address->l2", result);
    setInnerHtml("footer->address->l3", result);
    createFooterLinks(result['footer']);

    hideLoader();
  }});
}

function setImages(id, data){
  var container1 = $('<div class="plantation row" ></div>');
  data.forEach(i => {
    var element = `<div class="gallery_product col-6 col-md-3">
    <div class="awesome-img"> <a href="#"><img src="${i['url']}" alt="" class="img-wd"/></a>
      <div class="add-actions ">
        <div class="project-dec"> <a class="venobox" title="${i['name']}" data-gall="myGallery" href="${i['url']}">    </a>
    
         </div>
      </div>
    </div>
  </div>`;
    container1.append(element);
  });
  $(`#${id}`).html(container1);
}

function setInnerHtml(path, result){
  let data = result;
  let id = path.replace(/->/g, "-");
  let pathArray = path.split("->");
  pathArray.forEach(i => {
    data = data[i];
  });
  $(`#${id}`).html(data);
}

function createFooterLinks(result){
  let usefulLinks = result['useful-links'];
  var container1 = $('<ul class="list-unstyled"></ul>');
  usefulLinks.forEach(i => {
    var element = `<li><a href="${i['link']}" class="py-2 d-block">${i['title']}</a></li>`;
    container1.append(element);
  });
  $('#footer-useful-links').html(container1);

  let config = result['configuration'];
  var container2 = $('<ul class="list-unstyled"></ul>');
  config.forEach(i => {
    var element = `<li><a href="${i['link']}" class="py-2 d-block">${i['title']}</a></li>`;
    container2.append(element);
  });
  $('#footer-configuration').html(container2);
}

loadData();