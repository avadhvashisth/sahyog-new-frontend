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
  $.ajax({url: `${baseURL}product`, success: function(result){

    setInnerHtml("header->name", result);
    let imgUrl = result['header']['img'];
    $("#header-img").attr("style", `background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.75),rgba(255, 255, 255, 0.75)),url(${imgUrl})`);

    loadContainer(1, result);
    loadContainer(2, result);
    loadContainer(3, result);

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

function loadContainer(index, result){
  $(`#container${index}-col3-img`).attr("src", result[`container${index}`]['col3']['img']);
  setInnerHtml(`container${index}->col3->button`, result);
  setInnerHtml(`container${index}->col9->p1`, result);
  setInnerHtml(`container${index}->col9->p2`, result);
  setInnerHtml(`container${index}->col9->p3`, result);
  setInnerHtml(`container${index}->col9->h4`, result);
  setInnerHtml(`container${index}->col9->p4`, result);
  setInnerHtml(`container${index}->col9->p5`, result);
  setInnerHtml(`container${index}->col9->p6`, result);
  setInnerHtml(`container${index}->col9->h6`, result);
  setList(`container${index}-col9-ol`, result[`container${index}`]['col9']['ol']);
}

function setList(id, data){
  var container1 = $('<ol></ol>');
  data.forEach(i => {
    var element = `<li>${i}</li>`;
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