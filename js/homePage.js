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
  $.ajax({url: `${baseURL}home`, success: function(result){
    //top-container
    $("#top-container-img").attr("src", result['top-container']['img']);
    setInnerHtml("top-container->h1->span1", result);
    setInnerHtml("top-container->h1->span2", result);
    setInnerHtml("top-container->h1->span3", result);
    setInnerHtml("top-container->h1->p", result);

    //container1
    let imgUrl = result['container1']['img'];
    $("#container1-img").attr("style", `background-image: url(${imgUrl});`);
    setInnerHtml("container1->heading", result);
    setInnerHtml("container1->content1->heading", result);
    setInnerHtml("container1->content2->heading", result);
    setInnerHtml("container1->content3->heading", result);
    setInnerHtml("container1->content1->p1", result);
    setInnerHtml("container1->content1->p2", result);
    setInnerHtml("container1->content2->p1", result);
    setInnerHtml("container1->content2->p2", result);
    setInnerHtml("container1->content3->p1", result);
    setInnerHtml("container1->content3->p2", result);

    //container2
    setInnerHtml("container2->heading", result);
    setInnerHtml("container2->content1->data-number", result);
    setInnerHtml("container2->content2->data-number", result);
    setInnerHtml("container2->content3->data-number", result);
    setInnerHtml("container2->content4->data-number", result);
    setInnerHtml("container2->content1->span", result);
    setInnerHtml("container2->content2->span", result);
    setInnerHtml("container2->content3->span", result);
    setInnerHtml("container2->content4->span", result);

    //container3
    setInnerHtml("container3->heading", result);
    createCards(result['container3']['questions']);

    //container4
    setInnerHtml("container4->heading", result);
    $("#container4-map-url").attr("src", result['container4']['immap-url']);

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

function setInnerHtml(path, result){
  let data = result;
  let id = path.replace(/->/g, "-");
  let pathArray = path.split("->");
  pathArray.forEach(i => {
    data = data[i];
  });
  $(`#${id}`).html(data);
}

function createCards(questions){
  var container1 = $('<div class="col-md-6"></div>');
  var container2 = $('<div class="col-md-6"></div>');
  questions.forEach((i, index) => {
    var card = 
    `<div class="card">
      <div class="card-header">
        <a class="card-link" data-toggle="collapse"  href="#menu${index}" aria-expanded="false" aria-controls="menu${index}">${i['question']} <span class="collapsed"><i class="ion-ios-arrow-up"></i></span><span class="expanded"><i class="ion-ios-arrow-down"></i></span></a>
      </div>
      <div id="menu${index}" class="collapse">
        <div class="card-body">
          <p>${i['answer']}</p>
        </div>
      </div>
    </div>`;
    if(index % 2 == 0){
      container1.append(card);
    }else{
      container2.append(card);
    }
  });
  $('#container3-questions').html(container1.add(container2));
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