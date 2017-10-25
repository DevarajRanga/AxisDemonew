<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AxisRoomsChat.aspx.cs" Inherits="AxisRoomsChat.AxisRoomsChat" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title></title>
    <link href="CSS/AxisChat_Common.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <script src="JS/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
    <script src="JS/AxisChatContent.js"></script>
</head>
<body ng-app="axisApp">
    <form id="form1" runat="server">
    <div class="chat_cnt" ng-controller="chatController">
          <div class="chat_lft_cnt">
              <div class="cnt_title"><h3>Chats<i class="fa fa-search" aria-hidden="true"></i></h3></div>
              <div class="friednlist"><span class="frnd_itm sortbtn" ng-click="sortfun('FriendName')" >Name</span><span class="frnd_itm sortbtn" ng-click="sortfun('on')">Date</span></div>
              <div class="friednlist" ng-repeat="dtls in friendsDtl | orderBy:sortCol:sortodr" ng-click="getData(dtls.FriendID)">
                  <div class="frnd_itm" ng-class="activateChat(dtls.FriendID)">
                      <img class="fitm_img" src="http://localhost:59026/Image/anju.jpg" /><h3 class="fitm_name">{{dtls.FriendName}} <span>{{dtls.on }}</span></h3><p class="lst_msg">{{dtls.message}}</p>
                  </div>
              </div>
          </div>
        <div class="chat_right_cnt">
            <div class="cnt_title"><h3>Messages<span style="float:right;margin: -5px 0 0 0px;"><label class="switch"><input type="checkbox" ng-click="setMessager()" ><span class="slider"></span></label></span></h3></div>
            <div class="msg_cnt" ng-class="{{opclass}}">
                <div class="msg_lst" ng-repeat="data in msgdtls" >
                    <div class="msg_item {{data.MessageBy > 0 ? 'right' : 'left'}}">{{data.Message}}</div><div style="clear:both" ng-show="{{data.MessageBy > 0 ? true : false}}"></div>
                </div>
            </div>
            <div class="msg_send" style="display:{{friednId > 0 ? 'flex' : 'none'}}"><textarea ng-model="messageTxt" placeholder="Type Your Message"></textarea><span class="msg_btn" ng-click="insertMsg()"  ng-disabled="enablesend()">send</span></div>
          </div>
    </div>
    </form>
</body>
</html>