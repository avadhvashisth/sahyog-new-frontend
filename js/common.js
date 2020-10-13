import $ from 'jquery';

function showLoader(){
  console.log("asdasdasd");
  $('#ftco-loader').addClass('show');
}

function hideLoader(){
  $('#ftco-loader').removeClass('show');
}

export {
  showLoader,
  hideLoader
};
