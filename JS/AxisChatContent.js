var angApp = angular.module('axisApp', []);
angApp.controller('chatController', function ($scope, genricAjax, $timeout) {
    $scope.friednId = 0;
    $scope.checkboxModel = 0;
    $scope.messageTxt = "";
    $scope.getData = function (frid) {
        genricAjax.CommonAjax('Handlers/GetMessage.ashx?ver=', { Op: "GetMessage", id: frid }).then(function (response) {
            $scope.msgdtls = response.data; console.log(response.data);
                $timeout(function () { $('.msg_lst').addClass('opglow') }, 100);
                $scope.friednId = frid;
                $timeout(function () { $(".msg_cnt").scrollTop($(".msg_cnt")[0].scrollHeight) }, 100);
                //$scope.activateChat(frid);
        }, function (response) {
            $scope.errText = response.statusText;
        });
    }
    $scope.insertMsg = function() {
        debugger;genricAjax.CommonAjax('Handlers/GetMessage.ashx?ver=', { Op: "SetMsg", Id: $scope.checkboxModel, friendId: $scope.friednId, message: $scope.messageTxt }).then(function (response) {
            $scope.messageTxt = "";
            $scope.getData($scope.friednId)
        }, function (response) {
            $scope.errText = response.statusText;
        });
    }
    $scope.activateChat = function (id) {
        if (id == $scope.friednId)
            return 'active';
        else
            return "";
    }
    $scope.enablesend = function () {
        if ($scope.messageTxt == "")
            return true
        else
            return false;
    }
    $scope.setMessager = function () {
        $scope.checkboxModel = ($scope.checkboxModel == 0 ? 1 : 0 );
    }
    $scope.friendslist = function () {
        genricAjax.CommonAjax('Handlers/GetMessage.ashx?ver=', { Op: "GetFriend" }).then(function (response) {
            $scope.friendsDtl = response.data; console.log(response.data);
           this.addClass('chat-active')
        }, function (response) {
            $scope.errText = response.statusText;
        });
    }
    $scope.sortfun = function (col) {
        $scope.sortodr = ($scope.sortCol == col) ? !$scope.sortodr : false;
        $scope.sortCol = col;
    }
    $scope.friendslist();
})
angApp.factory('genricAjax', ['$http', function ($http) {
    return {
        CommonAjax: function (url, param) {
            var session;
            var $checkSessionServer = $http({
                url: url + new Date().getTime(),
                method: "post",
                params: param
            });
            return $checkSessionServer;
        }
    };
}])

//[{ "FriendId": 1, "Name": "Anju", "photo": "image/anju.jpg" },
//                         { "FriendId": 2, "Name": "Anjali", "photo": "image/anju.jpg" },
//                         { "FriendId": 3, "Name": "Karthik", "photo": "image/karthick.jpg" },
//                         { "FriendId": 6, "Name": "Pavan", "photo": "image/pavan.jpg" },
//                         { "FriendId": 4, "Name": "Sunil", "photo": "image/sunil.jpg" },
//                         { "FriendId": 5, "Name": "Sindhu", "photo": "image/sindhu.jpg" }]