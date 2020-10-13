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
  $.ajax({url: `${baseURL}about`, success: function(result){

    setInnerHtml("header->name", result);
    let imgUrl = result['header']['img'];
    $("#header-img").attr("style", `background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.75),rgba(255, 255, 255, 0.75)),url(${imgUrl})`);
    setInnerHtml("section->_type->head1", result);
    setInnerHtml("section->_type->head-content1->p1", result);
    setInnerHtml("section->_type->head-content1->p2", result);
    setInnerHtml("section->_type->head-content1->strong", result);
    $("#section-_type-head-content1-img").attr("src", result['section']['_type']['head-content1']['img']);
    setInnerHtml("section->_type->head-content2->p1", result);
    setInnerHtml("section->_type->head-content2->p2", result);
    $("#section-_type-head-content2-img").attr("src", result['section']['_type']['head-content2']['img']);
    setInnerHtml("section->_type->head2", result);
    setInnerHtml("section->_type->head-content3->p", result);
    setInnerHtml("table->header", result);
    createTable(result['table']['data']);

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

function createTable(result){
  var container1 = "";
  result.forEach(i => {
    var element = `<tr>
    <td>${i['label']}</td>
    <td>${i['value']}</td>
    </tr>`;
    container1 += element;
  });
  $('#table-data').html(container1);
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