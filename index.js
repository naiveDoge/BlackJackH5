import $ from "jquery";
import 'bootstrap';

$('#navSingle').click(function(){
    $('#mainIframe').attr('src', './src/singlePlayer.html');
});