//#region 
"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
          resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol == "function" &&
      (g[Symbol.iterator] = function() {
        return this;
      }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
              y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };

//#endregion

exports.__esModule = true;

var fs = require('fs');
var WebSocket = require("ws");

const readline = require("readline");
const { triggerAsyncId } = require("async_hooks");
const { resolve } = require('path');
const { response } = require('express');
const dotenv = require('dotenv').config();



//#region  variable and imports


var HANDLER_LOGIN = "login";
var HANDLER_LOGIN_EVENT = "login_event";
var HANDLER_ROOM_JOIN = "room_join";
var HANDLER_ROOM_LEAVE = "room_leave";
var HANDLER_CHAT_MESSAGE = "chat_message";
var HANDLER_ROOM_EVENT = "room_event";
var HANDLER_ROOM_ADMIN = "room_admin";
var HANDLER_ROOM_MESSAGE = "room_message";
var HANDLER_PROFILE_OTHER = "profile_other";
var HANDLER_PROFILE_UPDATE = "profile_update";
var TARGET_ROLE_MEMBER = "member";
var TARGET_ROLE_KICK = "kick";
var TARGET_ROLE_OUTCAST = "outcast";
var TARGET_ROLE_NONE = "none";
var TARGET_ROLE_ADMIN = "admin";
var TARGET_ROLE_OWNER = "owner";
var CHANGE_ROLE = "change_role";
var MSG_ID = "message_id";
var ROLE_CHANGED = "role_changed";
var emojis = [" "];
var MESSAGE_TYPE;
global.RoomUsers = "";
(function(MESSAGE_TYPE) {
  MESSAGE_TYPE["TEXT"] = "text";
  MESSAGE_TYPE["IMAGE"] = "image";
})(MESSAGE_TYPE || (MESSAGE_TYPE = {}));

var logger;

var myLove = false;
var invAll = false;
var trinvAll = false;
var myenemy = false;
var isKicked = false;
var getRoomusers = false;
var trComm = false;
var trRoomuserGrabCmplt = false;
var isMemberOnlyRoom = false;
var isLockedRoom = false;
var tempUser = "";
var temptargetRoom = "";
var actorUser = "";
var trInputRoom = "";
var TrRoomsArr = [];
var TrRoomsArrWLM = [];
var TrAllRoomsUsers = [];
var TargetArray = [];

var searchLimitReached;
var publicRoomsArr = [];
var isRoomEnterComplete;


function rndString(passwordLength) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

function genSeriel(passwordLength) {
  var chars = "0123456789";
  password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password
}



//#endregion

var Hangbot = /** @class */ (function() {
  function Hangbot(user, pass) {
    this.URL = process.env.WS_ADDRESS;
    this.webSocket = null;
    this.userName = "";
    this.passWord = "";
    this.roomName = "friends"; //Room name
    this.tempRoom = "";
    this.ispfpCheck = false;
    this.isProfileCheck = false;
    this.roomImageWC = false;
    this.wcImage = true;


    this.quotes = ["Let’s marry our souls.", "Let’s slow dance with the moon, and feel the stars kiss our eyes.", "I love planting kisses in all the forgotten places- between the blades, the curves connecting legs to torso, the calf, the ankle, the nails, the places often ignored by love. This is the lost garden of intimacy, where love grove from lips.", "Make love to my blood, tease my veins.", "You get my mind naked.", "I want you between my lips speaking French.", "You’re the scent I want to wear.", "Etch your presences into the corners of my soul, painting several shades of love, building foundations of eternity as we take this walk down the aisle of eternity. Let the eclipse of our soul dominate the clouds.", "If there is a parallel universe, I will fight through the stars to find you- Dallylondon", "Let’s dance our heaven together.", "Kiss me like you want to taste my soul.", "I want to feel the sunrise between your thigh- Dallylodon", "Let’s get high tonight, and dive naked into an ocean of stars.", "Let’s die this life together, under the heartbeats of stars, as we born ourselves again, becoming lions of the dark.", "I don’t need a thousand reasons to feel special. All I need is you to live in this world. You are the sunshine of my life.", "I want to be inside you, and feel what love feels like beating from your heart.", "I find you in my dreams, so my mind doesn’t miss you, while we sleep.", "Even if the stars fail to shine and the moon refuses to light up the world, I know I have nothing to fear. I have my guardian angel to look after me, care for me and love me forever and always. I love you!", "I want to drown with your lips, in the ocean of our kiss.", "I wish you could hear, how my butterflies sound when you get near.", "Each time I make a wish, I wish for us to be together forever. I know it will come true because you already live in my heart. I love you.", "Give me your hand of today, and I’ll walk with you, through lifetimes of tomorrow.", "My day is not complete if I don’t tell you I love you.", "I want to get drunk in your skin, as it glistens drops of love, pouring from our sin.", "You worth more than diamonds, worth more than gold, all those things are mere rocks compared to what you mean to me.", "I would climb a thousand mountains to see you smile. I love you so much!", "They say you only fall in love once, I doubt that to be true cos every time I look at you, I fall in love all over again.", "Let’s make love with the moonlight, and cuddle sunrises of fading stars.", "I want to make love with my tongue, and whisper kisses, through your mind, until your body comes, undone- Body language.", "Just when I thought I couldn’t be any happier, I see you and all that changes again.", "Shakespeare would have been right if he said “a life without love is miserable” Without you, I am nothing but empty nothing. Thanks for being mine. I love you.", "And at my funeral, don’t be sad for us my love, I have a soul that will fight lifetimes in the dark, waiting for your light to come.", "When I think of it, you are my favorite hello and hardest goodbye. My heart skips a beat every time I set my eyes on you. You are my sunshine baby.", "My heart for you will never break. My smile for you will never fade. My love for you will never end. I love you a million more!", "You have this incredible way of making my heart happy. You are my treasure always.", "Sometimes I wonder if love is worth fighting for, then I remember your face and I’m ready for war.", "Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control.", "I am willing to spread my wings and fly around the world if you stay with me. I want to give the whole world to you, my fancy doll.", "I am not a romantic man, but I am deeply in love with you, and I want to shout how happy I am until the end of times.", "I dissolve in you just like sugar melts in the water. You are my one and only sweetheart.", "I love to look into your eyes. They reflect my happiness.", "I want to nibble on your neck and make your goosebumps, a mess.", "I never knew that I was rich until I met you. You are the most expensive gift in my life.", "And when our lips finally touch, the universe will darken the sky, lighting up a parade of stars, as we kiss into the night.", "Before you, I looked at life as at the combination of black and white colors with grey shadows. With you, I finally see the bright colors that make me happy and bring love into my every day.", "If I were a cupcake, you would be the delicious vanilla filling to me. Without it, the cake would lose its fantastic flavor. Without you, I would lose myself.", "I do not need a box of chocolate candies because I already have you. You sweeten my days and coat my nights with sugar.", "I adore you like a bee loves the flowers. You are my honey, my dream, my everything.", "You are my life battery. When I feel that my power is soon to go off, I kiss you and respire your belief in me.", "I want to go down on your thoughts, and taste feelings deep within, as we grow desire’s bloom in the garden of our insatiable hearts.", "I am not good at saying ‘I love you’ so I would send this short message as a virtual kiss.", "When you smile, I imagine how the gates to Heaven open. You are my angel who I love so much that I will be lucky to stay by your side till the end of our days.", "Roses are pink, and the skies are blue. I cannot think clear without you.", "My heart pulsates so fast when I look at you. In my eyes, you are the most beautiful angel who flew from Heaven to our Earth to steal my love.", "Honey, have you seen my heart? I think I have left it with you this morning.", "When you see a falling star tonight, make a wish, it will come true because I wished and I found you.", "Let’s journey to forever together.", "Attraction brought us closer. Love’s gonna keep us that way, forever.", "The only word to describe you, is MINE and the only word to describe us, is forever.", "To survive, humans need air, food, and water. I just need your hugs, smiles, and kisses. I love you.", "I’m having one of those days that make me realize how lost I’d be without you.", "I only saw you for a second, but it made my day.", "There are only two times that I want to be with you… Now and Forever.", "Your love is the only armor I need to fight all of life’s battles.", "If I could be anything I would be your tear, so I could be born in your eye, live down your cheek and die on your lips.", "My heart for you will never break. My smile for you will never fade. My love for you will never end. I love you!", "Every time we cuddle turns into my life’s newest priceless memory.", "If you were Facebook, I would check your updates 24/7. If you were twitter, I would keep tweeting I Love You constantly. If you were Instagram, I would keep uploading selfies all day long. If you were Pinterest, I would pin my heart on you.", "The only hashtag trending in my life, right now and forever, is #YOU. Good morning.", "The day can’t start without a hug and a kiss. So, wake up and come outside – I will be waiting.", "Just now I was called by Inspector Dream that all the nightmares have arrested and you can now sleep well, my sweetheart. Good Night.", "Your soul is like outer space: so large and so mysterious. I believe that true love is a special connection of two souls and I really wish I could be the astronaut who would discover all the secrets you hide.", "You are like a rainbow: so many colors and shadows. You always make me admire you. Nature has created you so beautiful, and sometimes I doubt if I am a good match for you.", "you were a beautiful song, you would be my favorite one. If you were a book, you would change my mind forever. But you are you, and I love you no matter what.", "They say love is blind, but actually, it has opened my eyes and changed me for the better. Thanks to you, now I know what true love is.", "You’re like a picture painted by a genius artist: so beautiful and so mysterious. I hope one day you will allow me to solve this riddle, because I’m a fool for you and you’re all I can think about.", "My heart sings for you only. You’re my perfect love.", "You are my first thought in the morning and last thought before sleep. You are my love in life and always.", "Distance is nothing. You’re right here in my heart and I love you more than ever.", "May your day be as bright as you make mine. A happy new day.", "The moon is bright, the stars are out. My love for you shines through, brighter than the brightest star.", "There’s no measuring my love for you. It’d break every scale known to man. I love you beyond measure.", "Why do I have to love you so much? Why do I have to carry you in my heart everywhere I go? You’re my addiction. I’m high on you.", "Ever wondered why I glow? Of course, you’re the guilty one. Loving you gives so much joy and my skin responds by glowing.", "My honey pie, after God, it’s you. I love you more than words can say.", "You’re an awesome package of all that is pleasant and beautiful. You’re an angel and I’m lucky you’re mine.", "“I dreamt that you were mine, and then I woke up smiling because I realized it was not a dream. You are already mine!", "“My permanent relationship status – taken forever by the most gorgeous woman in this universe. Love ya!”", "Spin your mind with me, let’s twist the moon, and dance through stardust, of life’s ballroom.", "“You are my answered prayer, My fulfilled wish, my realized dream.”", "“If our lives were a ship, I would call it LOVE FOREVER. Happy sailing!”", "You make waves in my blood, pulsing feelings to my heart, drowning beats with love.", "I thought that love was overrated until the day I fell in love with you. You changed everything, my world, my life.", "I love you more than I did yesterday but not more than I will tomorrow.", "Just had to let you know… loving you is the best thing that happened to me.", "Can I borrow a kiss? I promise to give it back.", "If Van Gogh had you as a subject, the sunflowers would have gone in the trash.", "If I were a stoplight, I would turn red every time you passed by so that I could stare at you a bit longer.", "You wanna know who I’m in love with? Read the first word again.", "If nothing lasts forever, can I be your nothing?", "I can’t decide if the best part of my day is waking up next to you, or going to sleep with you. Hurry home so I can compare the two again.", "Everyone has their own motivation to get up in the morning and face the day. You are mine.", "Whenever my phone vibrates, I hope you’re the reason for it.", "Forget the butterflies, I feel the whole zoo when I am with you!", "Every day I spend with you is the new best day of my life. Can’t wait for the morning. Goodnight!", "The brightest thing in this world are your eyes when you look at me. I don’t want to see stars, but your eyes. Have a good night.", "I choose you. And I’ll choose you over and over. Without pause, without a doubt, in a heartbeat. I’ll keep choosing you.", "Color your lips with my skin.", "“You have me. Until every last star in the galaxy dies. You have me.”", "My soul saw you and it kind of went, “Oh, there you are. I’ve been looking for you.”", "I want to make out with your mind, and fall in love with thoughts, as we kiss away the time.", "If I could give you one thing in life, I’d give you the ability to see yourself through my eyes, only then would you realize how special you are to me.", "My six-word love story: “I can’t imagine life without you.”", "You’re my paradise and I’d happily get stranded on you for a lifetime.", "You have gripped my soul with a ferocity reserved for a castaway clinging to a raft in the middle of the ocean. If my soul is the raft, it is your hold that keeps me afloat. Don’t ever let go. I love you.", "“If you live to be a hundred, I want to live to be a hundred minus one day so I never have to live without you.”", "“In French, you don’t say ‘I miss you.’ You say ‘Tu me manques’, which means ‘you are missing from me.’ I love that.”", "“By the way, I’m wearing the smile you gave me.”", "“I am totally completely eye-popping seriously groundbreaking passionately deliciously in love with you.”", "“I was, and I remain, utterly and completely and totally in love with you.”", "“You are my favorite notification.”", "Come live in my heart and pay no rent.", "Loved you yesterday, love you still, always have, always will.", "Thinking of you keeps me awake. Dreaming of you keeps me asleep. Being with you keeps me alive.", "You are the best part of my life. I love spending time with you.", "I love you more than coffee – but please don’t make me prove it.", "My heart for you will never break. My smile for you will never fade. My love for you will never end. I love you a million more!", "Sometimes I wonder if love is worth fighting for, then I remember your face and I’m ready for war.", "I want to be your favorite hello and hardest goodbye.", "Love, you are the sky and the clouds; you are the gentle river and the birds that sing. I feel you in the air, long for your touch, recall you in a way that sends electricity to spark my mind, body, and soul. You are medicine; you are light; you are laughter and hope. I slipped my heart into your pocket some time ago and there it will stay, safe and sound.", "To kill you and me, there would only ever have to be one bullet.", "You stole my heart but I’ll let you keep it cos you make me happy in a thousand ways. I love you to the moon and back."];
    // this.myLove = false;
    // this.myenemy= false;
    // Bot Master ID
    this.masters = fs.readFileSync("masters.txt").toString().split("\n"); //master list

    this.botMasterId = process.env.BOT_MSTR;
    this.wcSettingsMap = new Map();
    this.spinSettingsMap = new Map();
    this.user_list = [];
    this.room_list = [];
    this.Troom_list = [];
    this.Proom_list = [];



    this.isWcGreetings = true;
    this.isSpin = false;

    this.sL = "en";
    this.userName = user;
    this.passWord = pass;
    var headers = {
      headers: {
        m: this.generateBuildInfo(),
        i: this.keyGen(20),
        //i: "e9a5a82f2405d823",
      },
    };
    //console.log(this.generateBuildInfo());
    //console.log(this.keyGen(16));
    this.webSocket = new WebSocket(this.URL, [], JSON.stringify(headers));
    this.webSocket.addEventListener("open", this._onOpen.bind(this));
    this.webSocket.addEventListener("close", this._onClose.bind(this));
    this.webSocket.addEventListener("message", this._onMsg.bind(this));
    this.webSocket.addEventListener("error", this._onError.bind(this));

    // this.webSocket.addEventListener('error', (event) => {
    //   console.log('WebSocket error: ', event);
    // });

    // this.webSocket.on('error', async (error) => {
    //     console.log("Server is offline");
    //     this.webSocket.close();
    // });

  }

  Hangbot.prototype._onError = function(error) {
    console.log("Server is offline");
    this.webSocket.close();
    setTimeout(function() {
      var h0 = new Hangbot(this.userName, this.pasWord);
    }, 20000);

  };

  Hangbot.prototype._log = function() {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      msg[_i] = arguments[_i];
    }
    //console.warn.apply(console, __spreadArray(["LOG ====>"], msg));
  };
  Hangbot.prototype._onClose = async function(close) {
    this._log("ws: Socket closed");
    searchLimitReached = false;
    publicRoomsArr = [];
    this.recentUsers = [];
    isRoomEnterComplete = false;

    setTimeout(function() {
      Hangbot.prototype.login();
    }, 10000);
  };
  Hangbot.prototype._onPing = function(ping) {
    this._log(ping);
    if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN) {
      console.log("ping");
    };
  };
  Hangbot.prototype._onOpen = async function(open) {
    this._log("ws: Socket opened");
    //keepAlive(3000);

    this.webSocket.pingInterval = setInterval(
      () => this.webSocket.ping(), 1000 * 60
    );

    this.login();

  };
  Hangbot.prototype._onMsg = function(payload) {
    if (payload != null) {
      //this._log(payload.data);
      var parsedData = JSON.parse(payload.data);
      this._handleParsedData(parsedData);
    }
  };
  var x = 0;
  Hangbot.prototype._handleParsedData = async function(parsedData) {
    //console.log(parsedData)
    var _this = this;
    if (parsedData.handler == HANDLER_LOGIN_EVENT) {
      if (parsedData.type == "success") {
console.log("Logined success : ",  this.userName )
        var item = this.quotes[Math.floor(Math.random() * this.quotes.length)];

        //this.setStatus("Hangbot by\nhttps://t.me/voidrulz");
        this.setStatus(item);
        this.joinRoom("friends");
        //this.getPublicRooms();
        //this.joinRooms();

      }
      
         
      if (parsedData.type == "failed") {
console.log("Logined failed : ",  this.userName )

      }
      
    }
    if (parsedData.handler == HANDLER_ROOM_EVENT) {
      if (parsedData.type == "text") {
        var from = parsedData.from;
        var message = parsedData.body;
        var room = parsedData.room;
        this.processGroupChatMessage(from, message, room)

      }


      if (parsedData.type == "your_role_changed" &&
        parsedData.new_role == "kicked"
      ) {
        // console.log("kicked")
        // console.log(parsedData)
        this.joinRoom(parsedData.name);
      }


      if (parsedData.type == "you_joined") {
        this.tempRoom = parsedData.name;
        console.log("joined to : " + this.tempRoom);
        //this.sendSong("baby justin bieber", this.tempRoom);
      }
      if (parsedData.type == "room_unsufficient_previlige") {
        var room_2 = parsedData.name;
        //this.setAccountColor();
        //this.sendRoomMsg(room_2, "❌ Insufficient Privileges.");
      }
      if (parsedData.type == "room_membership_required") {
        isMemberOnlyRoom = true;
        //console.log(" vvvvvvvvvvvvvvvvvvvvvv" + parsedData.name);
        var room_2 = parsedData.name; //memOnlyRoom Name
        //this.setAccountColor();
        //this.sendRoomMsg(this.tempRoom, "❌ Insufficient Privileges!!\nMembership required to enter the room");
      }
      if (parsedData.type == "room_needs_password") {
        isLockedRoom = true;
        var room_2 = parsedData.name; //lockedRoom Name
        //this.setAccountColor();
        //this.sendRoomMsg(this.tempRoom, "❌ Insufficient Privileges!!\nRoom Password required to enter the room");
      }
      if (parsedData.type == ROLE_CHANGED) {
        var room_3 = parsedData.name;
        var userName_1 = parsedData.t_username;
        var newRole = parsedData.new_role;
        //this.sendRoomMsg(room, "✅ " + userName + " is now " + newRole + ".");
      }
    }

  };
  Hangbot.prototype.processGroupChatMessage = function(from, message, room) {
    return __awaiter(this, void 0, void 0, function() {
      var search,
        videos,
        msg,
        random,
        search,
        targetId,
        str,
        targetId,
        str,
        targetId,
        str,
        targetId,
        str,
        targetId,
        kickPayload,
        trendingPayload,
        str,
        targetId,
        str,
        targetId,
        str,
        targetId,
        str,
        targetId,
        searchQuery,
        searchQuery,
        searchQuery,
        searchQuery,
        token,
        targetQuery,
        str,
        roomUsersPayload,
        targetIndex,
        img_query_1,
        lang,
        audio_query,
        url,
        ud_query_1,
        trollface,
        instance,
        query_1,
        url,
        instance,
        query,
        x,
        query;
      var _this = this;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            //console.log(from + " : " + message);
            if (from == this.userName) {
            }
            if (!message.toLowerCase().startsWith("yt "))
              return [3 /*break*/, 2];
            search = message.substring(3).toString();
            //console.log('Fetching YT for: "' + search.replace(/\s/g, "") + '"');
            return [4 /*yield*/, yt.search(search.replace(/\s/g, ""))];
          case 1:
            videos = _a.sent();
            //console.log(videos[0].url);
            this.sendRoomMsg(room, videos[0].url);
            _a.label = 2;
          case 2:

            if (message.toLowerCase() == ".rj") {

              var text = fs.readFileSync("./masters.txt", "utf-8");
              var textByLine = text.split("\n");
              if (textByLine.includes(from)) {
                this.tempRoom = room;
                this.leaveGroup(room);
                this.joinRoom(room);

              }
            }

            if (message.toLowerCase() == ".quit") {

              var text = fs.readFileSync("./masters.txt", "utf-8");
              var textByLine = text.split("\n");
              if (textByLine.includes(from)) {
                this.tempRoom = room;
                this.leaveGroup(room);
                this.joinRoom(room);

              }
            }

            return [2 /*return*/];
        }
      });
    });
  };

  //#region  other codes

  Hangbot.prototype.joinRoom = function(roomName) {
    var groupJoinPayload = {
      handler: HANDLER_ROOM_JOIN,
      id: this.keyGen(20),
      name: roomName,
    };
    if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(groupJoinPayload));
    }
  };

  Hangbot.prototype.login = function() {
    var loginPayload = {
      handler: HANDLER_LOGIN,
      id: this.keyGen(20),
      username: this.userName,
      password: this.passWord,
    };
    if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(loginPayload));
    }
  };


  Hangbot.prototype.keyGen = function(keyLength, isMsgId) {
    var i,
      key = "",
      characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (isMsgId) {
      characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ";
    }
    var charactersLength = characters.length;
    for (i = 0; i < keyLength; i++) {
      key += characters.substr(
        Math.floor(Math.random() * charactersLength + 1),
        1
      );
    }
    return key;
  };
  Hangbot.prototype.generateBuildInfo = function() {
    var info = "";
    info += "320"; // Fixed Constant
    info += "-"; // -
    info += "Iphone"; // Manufacturer
    info += "-"; // -
    info += "x13Pro"; // Model
    info += "-"; // -
    info += "14"; // Sdk Api
    return info;
  };
  Hangbot.prototype.sendRoomMsg = function(roomName, msg, photoUrl, audioUrl) {
    var groupMsgPayload = null;
    if (photoUrl) {
      groupMsgPayload = {
        handler: HANDLER_ROOM_MESSAGE,
        id: this.keyGen(20, true),
        room: roomName,
        type: MESSAGE_TYPE.IMAGE,
        url: photoUrl,
        body: "",
        length: "",
      };
    } else if (audioUrl) {
      groupMsgPayload = {
        handler: HANDLER_ROOM_MESSAGE,
        id: this.keyGen(20, true),
        room: roomName,
        type: "audio",
        url: audioUrl,
        body: "",
        length: "",
      };
    } else {
      groupMsgPayload = {
        handler: HANDLER_ROOM_MESSAGE,
        id: this.keyGen(20, true),
        room: roomName,
        type: MESSAGE_TYPE.TEXT,
        url: "",
        body: msg,
        length: "",
      };
    }
    if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(groupMsgPayload));
    }
  };
  Hangbot.prototype.setStatus = function(status) {
    var statusPayload = {
      handler: "profile_update",
      id: this.keyGen(20, true),
      type: "status",
      value: status
    };
    if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(statusPayload));
    }
  };
  Hangbot.prototype.leaveGroup = function(roomName) {
    var leaveGroupPayload = {
      handler: HANDLER_ROOM_LEAVE,
      name: roomName,
      id: this.keyGen(20, true),
    };
    if (this.webSocket != null && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(leaveGroupPayload));
    }
  };

  //#endregion
  return Hangbot;
})();

exports.Hangbot = Hangbot;


//#endregion
//#region  other

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included
}

//#endregion

function loginHangbots() {
  var h1 = new Hangbot(process.env.BOT1, process.env.HB_PWD);
  var h2 = new Hangbot(process.env.BOT2, process.env.HB_PWD);
  var h3 = new Hangbot(process.env.BOT3, process.env.HB_PWD);
  var h4 = new Hangbot(process.env.BOT4, process.env.HB_PWD);
  var h5 = new Hangbot(process.env.BOT5, process.env.HB_PWD);

}

loginHangbots();
