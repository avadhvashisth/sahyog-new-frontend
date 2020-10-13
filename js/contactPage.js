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
  $.ajax({url: `${baseURL}contactus`, success: function(result){
    $("#map-url").attr("src", result['map-url']);
    setInnerHtml("header->name", result);
    let imgUrl = result['header']['img'];
    $("#header-img").attr("style", `background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.75),rgba(255, 255, 255, 0.75)),url(${imgUrl})`);

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
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  var name = $('#form-name').val();
  var email = $('#form-email').val();
  var subject = $('#form-subject').val();
  var msg = $('#form-message').val();

  var data = {
    name,
    email,
    subject,
    msg
  };
  $.ajax({
    type: "POST",
    url: `${baseURL}contactmsg`,
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
    success: function(data) {
      alert("Your message has been send");
      $('#form-name').val('');
      $('#form-email').val('');
      $('#form-subject').val('');
      $('#form-message').val('');
    },
    dataType: 'json'
  });
  console.log(data);
});