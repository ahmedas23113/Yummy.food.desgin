export class Navbar{
    constructor (){
        $('#btnMenua').click(function(){
            $('#btnMenua').hide();
            $('.side-nav-menu').animate({left: '0px'} , function(){
                $('.ulLi').slideDown()
            })
        })
    }
}