$(document).ready(function() {
  // Hook up inAppBrowser
  // window.open = cordova.InAppBrowser.open;
  // Prevent elastic scrolling
  // document.ontouchmove = function(e) {e.preventDefault()};
  //uses body because jquery on events are called off of the element they are
  //added to, so bubbling would not work if we used document instead.
  // $('body').on('touchstart','.scrollable',function(e) {
  //   if (e.currentTarget.scrollTop === 0) {
  //     e.currentTarget.scrollTop = 1;
  //   } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
  //     e.currentTarget.scrollTop -= 1;
  //   }
  // });
  //prevents preventDefault from being called on document if it sees a scrollable div
  // $('body').on('touchmove','.scrollable',function(e) {
  //   e.stopPropagation();
  // });

  // handle idle refresh
  function idleRefresh() {
    var t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.onclick = resetTimer;     // catches touchpad clicks
    window.onscroll = resetTimer;    // catches scrolling with arrow keys
    window.onkeypress = resetTimer;

    function reloadPage() {
      location.reload();
    }

    function resetTimer() {
      clearTimeout(t);
      t = setTimeout(reloadPage, 45000);  // time is in milliseconds
    }
  }
  idleRefresh();

  var    userPath = null,
      userAnswers = [],
                i = null, 
              ent = $('#ent'),
             tech = $('#tech'),
             home = $('#home'),
          fashion = $('#fashion'),
           travel = $('#travel'),
           // the big boy himself, the object with all of the rewards inside.
          rewards = {
            ent:{
              a:{
                name: 'Your Private Beach at Exuma\'s Question Mark Sandbar in the Bahamas',
                cost: '295,000',
                image: 'beach.png',
                url: 'https://www01.extra.americanexpress.com/Experience.aspx?usclongcode=102717577&intlink=us-mr-25thanniversary-entertainment-YourownprivatebeachatExumasbrQuestionMarkSandbar'
              },
              b:{
                name: 'Private Mixology Lesson and Party with an Expert, Award-Winning Bartender*',
                cost: '100,000',
                image: 'mixology.png',
                url: 'https://www01.extra.americanexpress.com/Experience.aspx?usclongcode=102420966&intlink=us-mr-25thanniversary-entertainment-PrivateMixologyLessonandPartywithanExpertAwardWinningBartender'
              }
            },
            travel:{
              a:{
                name: 'TUMI Luggage',
                cost: '74,500',
                image: 'luggage.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=98948911&intlink=us-mr-25thanniversary-travel-TumiTegraLiteregMaxContinentalExpandableCarryOn'
              },
              b:{
                name: 'The Quintessential Wine Tasting',
                cost: '36,000',
                image: 'wine.png',
                url: 'https://www01.extra.americanexpress.com/Experience.aspx?usclongcode=102418889&intlink=us-mr-25thanniversary-travel-TheQuintessentialWineTastingExperienceampExplorationbrPrivatelyHosted'
              }
            },
            tech:{
              a:{
                name: 'Swarovski Activity Crystal',
                cost: '16,900',
                image: 'swarovski.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=102336207&intlink=us-mr-25thanniversary-tech-SwarovskiActivityCrystal'
              },
              b:{
                name: 'GoPro',
                cost: '62,999',
                image: 'gopro.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=102336208&intlink=us-mr-25thanniversary-tech-GoProHERO4Silverwith3wayMountCaseybrand32GBSDCard'
              }
            },
            home:{
              a:{
                name: 'Nespresso',
                cost: '14,900',
                image: 'nespresso.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=102166518&intlink=us-mr-25thanniversary-home-NespressoInissiaEspressoMachineSilver'
              },
              b:{
                name: 'Casper Mattress',
                cost: '83,500 – 132,000',
                image: 'mattress.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=102393216&intlink=us-mr-25thanniversary-home-TheDreamTeamTheCasperMattressPillowandSheetsTWINXL'
              }
            },
            fashion:{
              a:{
                name: 'Lavido',
                cost: '18,600',
                image: 'lavido.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=102393211&intlink=us-mr-25thanniversary-fashion-LavidoInspiredbyNatureHeadtoToeCollectionbrCuratedbyTravelBeautyreg'
              },
              b:{
                name: 'Cole Haan Bag',
                cost: '60,000',
                image: 'bag.png',
                url: 'https://www01.extra.americanexpress.com/Product.aspx?viewfullsite=y&usclongcode=102567055&intlink=us-mr-25thanniversary-fashion-ColeHaanGenevieveLargeTriangleTote'
              }
            }
          };

  $('section#splash').click(function() {
    $('#splash h1').fadeOut(); //figure out how to make just the text fade out... maybe not necessary.
    $('#splash').slideUp('slow');
  });

  $('.flexChild').click(function() {
    pathHandler(this.id);
  });

  $('#showcaseCTA').click(function() {
    cordova.InAppBrowser.open('https://www01.extra.americanexpress.com/MR25th/?extlink=us-mr-c1620|offsite|aw|part|mr25anniversary|mktgglobal|bdsc|vanity', '_blank', 'clearsessioncache=true, clearcache=true');
  });

  $('#refreshButton').click(function() {
    location.reload();
  })

  function pathHandler(triggerID) {
    // determines the path the user will take depending on their 'passion'
    if (userPath == null) {
      switch(triggerID) {
        case 'a':
          userPath = [ent, tech, travel];
          break;
        case 'b':
          userPath = [travel, tech, ent];
          break;
        case 'c':
          userPath = [tech, home, travel];
          break;
        case 'd':
          userPath = [home, ent, fashion];
          break;
        case 'e':
          userPath = [fashion, travel, tech];
          break;
        default:
          console.log('No requisite user path found');
          break;
      }
    }

    // fire logic handler
    logicHandler(triggerID);
  }

  function logicHandler(triggerID) {
    switch(i) {
      case null:
        // if they're on the first page
        $('#' + triggerID).css('opacity', '.4');
        $('#passion').fadeOut();
        setTimeout(function() {
          $('#choicesLogo').fadeIn('slow');
        }, 400);
        i = 0;
        fadeInHandler();
        break;
      case 0: // choice 1
        fadeOutHandler(triggerID);
        i = 1;
        fadeInHandler();
        break;
      case 1: // choice 2
        fadeOutHandler(triggerID);
        i = 2;
        fadeInHandler();
        break;
      case 2: // choice 3
        fadeOutHandler(triggerID);
        i = 3;
        fadeInHandler();
        break;
      default:
        console.log('No page caught in logic');
        break;

    }
  }

  function fadeInHandler() {
    setTimeout(function() {
      if (i == 3) {
        // fade last choices out & show the reward showcase
        $('header').slideUp('slow');
        $('#choicesLogo').fadeOut();
        $('#choices').fadeOut();
        setRewards();
        $('#showcase').css('display', 'block').hide().fadeIn();
      } else {
        // show the next set of choices
        userPath[i].css('display', 'flex').hide().fadeIn();
        headlineSwitcher();
      }
    }, 500);
  }

  function fadeOutHandler(triggerID) {
    $('#' + triggerID).css('opacity', '.4');
    userAnswers.push(triggerID);
    userPath[i].fadeOut();
  }

  function headlineSwitcher() {
    var headlineText,
        category = userPath[i];

    console.log(category[0].id);

    switch (category[0].id) {
      case 'ent':
        headlineText = 'Swim, or Sip?';
        break;
      case 'travel':
        headlineText = 'Travel light, or Red and White?';
        break;
      case 'home':
        headlineText = 'Wake up, or Sleep in?';
        break;
      case 'fashion':
        headlineText = 'Natural, or Fashionable?';
        break;
      case 'tech':
        headlineText = 'Glamorous, or Adventurous?';
        break;
      default:
        console.log('No category for headline was caught');
        headlineText = 'Which is more appealing?';
        break;
    }

    $('header h1').text(headlineText); // Actually inject the proper text
  }

  function setRewards() {
    console.log(userAnswers);

    // parse the answers into usable data
    featured = userAnswers[0].split('-');
    left = userAnswers[1].split('-');
    right = userAnswers[2].split('-');
    featuredCategory = featured[0];
    featuredPrize = featured[1];
    leftCategory = left[0];
    leftPrize = left[1];
    rightCategory = right[0];
    rightPrize = right[1];

    // left image
    $('#leftRewardTitle').text(rewards[leftCategory][leftPrize].name);
    $('#leftRewardCost').text(rewards[leftCategory][leftPrize].cost);
    $('#leftReward img').attr('src','img/rewards/' + rewards[leftCategory][leftPrize].image);
    $('#leftReward').click(function() {
      var leftURL = rewards[leftCategory][leftPrize].url;
      cordova.InAppBrowser.open(leftURL, '_blank', 'clearsessioncache=true, clearcache=true');
    });
    // center image
    $('#featuredRewardTitle').text(rewards[featuredCategory][featuredPrize].name);
    $('#featuredRewardCost').text(rewards[featuredCategory][featuredPrize].cost);
    $('#featuredReward img').attr('src','img/rewards/' + rewards[featuredCategory][featuredPrize].image);
    $('#featuredReward').click(function() {
      console.log('in the featured reward click listener');
      var featuredURL = rewards[featuredCategory][featuredPrize].url;
      cordova.InAppBrowser.open(featuredURL, '_blank', 'clearsessioncache=true, clearcache=true');
    });
    // right image
    $('#rightRewardTitle').text(rewards[rightCategory][rightPrize].name);
    $('#rightRewardCost').text(rewards[rightCategory][rightPrize].cost);
    $('#rightReward img').attr('src','img/rewards/' + rewards[rightCategory][rightPrize].image);
    $('#rightReward').click(function() {
      console.log('in the right reward click listener');
      var rightURL = rewards[rightCategory][rightPrize].url;
      cordova.InAppBrowser.open(rightURL, '_blank', 'clearsessioncache=true, clearcache=true');
    });
  }

});