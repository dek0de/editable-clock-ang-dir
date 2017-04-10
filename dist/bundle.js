'use strict';

(function () {
  angular.module('app', ['ngRoute', 'ngMaterialDatePicker']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/dashboard', {
      template: '<dashboard></dashboard>'
    }).otherwise({
      redirectTo: '/dashboard'
    });

    $locationProvider.html5Mode(true);
  }]);
})();
'use strict';

(function () {
  angular.module('app').component('dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: DashboardController,
    controllerAs: 'vm'
  });

  DashboardController.$inject = ['$scope', '$interval', '$animate'];

  function DashboardController($scope, $interval, $animate) {
    var vm = this;
    vm.timeChanged = timeChanged;
    initLocalClocks();

    function timeChanged() {
      console.log(vm.clock);
      handleTime(vm.clock);
    }

    function handleTime(dateObjIn) {
      var dateObj = moment(dateObjIn);
      var seconds = dateObj.second();
      var minutes = dateObj.minute();
      var hours = dateObj.hour();

      // Create an object with each hand and it's angle in degrees
      var hands = [{
        hand: 'hours',
        angle: hours * 30 + minutes / 2
      }, {
        hand: 'minutes',
        angle: minutes * 6
      }, {
        hand: 'seconds',
        angle: seconds * 6
      }];
      // Loop through each of these hands to set their angle
      for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
          elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
          elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
          // If this is a minute hand, note the seconds position (to calculate minute position later)
          if (hands[j].hand === 'minutes') {
            elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
          }
        }
      }
    }

    function initLocalClocks() {
      // Get the local time using JS
      vm.clock = moment();
      handleTime(vm.clock);
    }

    /*
     * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
     */
    function setUpMinuteHands() {
      // Find out how far into the minute we are
      var containers = document.querySelectorAll('.minutes-container');
      var secondAngle = containers[0].getAttribute("data-second-angle");
      if (secondAngle > 0) {
        // Set a timeout until the end of the current minute, to move the hand
        var delay = ((360 - secondAngle) / 6 + 0.1) * 1000;
        $interval(function () {
          moveMinuteHands(containers);
        }, delay);
      }
    }

    /*
     * Do the first minute's rotation
     */
    function moveMinuteHands(containers) {
      for (var i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
      }
      // Then continue with a 60 second interval
      $interval(function () {
        for (var i = 0; i < containers.length; i++) {
          if (containers[i].angle === undefined) {
            containers[i].angle = 12;
          } else {
            containers[i].angle += 6;
          }
          containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
          containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
        }
      }, 60000);
    }

    /*
     * Move the second containers
     */
    function moveSecondHands() {
      var containers = document.querySelectorAll('.seconds-container');
      $interval(function () {
        for (var i = 0; i < containers.length; i++) {
          if (containers[i].angle === undefined) {
            containers[i].angle = 6;
          } else {
            containers[i].angle += 6;
          }
          containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
          containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
        }
      }, 1000);
    }
  }
})();
'use strict';

(function () {
  angular.module('app').component('appHeader', {
    templateUrl: 'header/header.html',
    controller: HeaderController,
    controllerAs: 'vm'
  });

  HeaderController.$inject = ['$rootScope', '$location'];

  function HeaderController($rootScope, $location) {
    var vm = this;
    vm.menu = $location.path().slice(1);

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      vm.menu = $location.path().slice(1);
    });
  }
})();