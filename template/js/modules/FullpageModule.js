export default function FullpageModule() {
    /** FULLPAGE */
    if (document.getElementById('fullpage')) {
        let myFullpage;
        function fullpageInit() {
            myFullpage = new fullpage('#fullpage', {
                // SCROLLING
                scrollingSpeed: 1000,
                autoScrolling: true,
                scrollBar: false,
                verticalCentered: true,
                scrollOverflow: true,
                scrollOverflowReset: true,
                scrollOverflowOptions: {
                    // scrollbars: false,
                },
                // NAVIGATION
                navigation: true,
                navigationPosition: 'right',
                responsiveWidth: 768,

                afterRender: function () {
                    window.dispatchEvent(new Event('resize'));
                    document.body.classList.add('fp-ready');
                    // IN WP ADMIN WILL HAS HEADER OF WP
                    // let heightMenuWp = 0;
                    // if (document.querySelector('body').classList.contains('logged-in')) {
                    //  heightMenuWp = 32;
                    //  document.querySelector('.header').style.top = heightMenuWp + 'px';
                    //  document.querySelector('.main').style.marginTop =
                    //      heightMenuWp + 'px';
                    // }
                    // DISABLE FIRST PAGE
                    document.querySelector('#fp-nav li').style.display = 'none';
                },
            });
        }
        fullpageInit();

        // let oldWidth = window.innerWidth;
        // window.addEventListener('resize', () => {
        //  if (window.innerWidth != oldWidth) {
        //      oldWidth = window.innerWidth;
        //      if (oldWidth > 768) {
        //          !document.querySelector('.fp-enabled') && fullpageInit();
        //      } else {
        //          document.querySelector('.fp-enabled') && fullpage_api.destroy('all');
        //      }
        //  }
        // });
        // myFullpage.moveTo(4);
        document
            .querySelector('.scroll-down__icon')
            .addEventListener('click', () => {
                myFullpage.moveTo(2);
            });
    }
}
