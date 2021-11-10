(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,a,t){e.exports=t(20)},17:function(e,a,t){},19:function(e,a,t){},20:function(e,a,t){"use strict";t.r(a);var o=t(0),r=t.n(o),n=t(7),s=t.n(n),i=t(1),l=t(2),c=t(4),m=t(3),d=t(5),g=(t(17),t(18),t(19),t(8)),h=t.n(g),u=function(){return r.a.createElement("header",{className:"py-5 text-center"},r.a.createElement("img",{className:"d-block mx-auto mb-3",src:h.a,alt:"project logo",width:"72",height:"72"}),r.a.createElement("h1",null,"Message encryption"))},p=t(9),b=t(10),E=function(e){var a="";return a=e.correct?"mb-1 marginFooter2":"mb-1 marginFooter",r.a.createElement("footer",{className:"mt-5 pt-3 text-muted text-center text-small"},r.a.createElement("p",{className:a},"\xa92019 The BestCode Corp."),r.a.createElement("nav",{id:"footer-navigation"},r.a.createElement("ul",{className:"list-inline"},r.a.createElement("li",{className:"list-inline-item"},r.a.createElement("a",{href:"#"},"Privacy")),r.a.createElement("li",{className:"list-inline-item"},r.a.createElement("a",{href:"#"},"Terms")),r.a.createElement("li",{className:"list-inline-item"},r.a.createElement("a",{href:"#"},"Support")))))},k=function(e){function a(){var e,t;Object(i.a)(this,a);for(var o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(t=Object(c.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(r)))).state={password:"",message:"",email:"",checkbox:!1,encryptionClicked:!1,decryptionClicked:!1,passwordValidation:!1,messageValidation:!1,codingValidation:!1,emailValidation:!1,allValidation:!1,showValidationErrors:!1,errorPasswordTooShort:!0,errorPasswordTooLong:!1,errorMessageTooShort:!0,errorMessageTooLong:!1,errorMessageNotCoded:!0,errorEmailIsInvalid:!1,errorcheckbox:!1,showMessageWasSent:!1},t.messages={errorPasswordTooShort:"The key is too short",errorPasswordTooLong:"The key is too long",errorMessageTooShort:"The text is too short",errorMessageTooLong:"The text is too long",errorMessageNotCoded:"The message was not coded",errorEmailIsInvalid:"Check if the mail is correct",errorcheckbox:"Please confirm",messageSend:"Success! Message was sent"},t.handleChange=function(e){var a=e.target.id,o=e.target.value;t.setState(Object(p.a)({},a,o))},t.handleEncryption=function(){var e=t.state,a=e.passwordValidation,o=e.messageValidation;a&&o&&(t.codeMessage(),t.handleEncryptionClickStatus())},t.handleDecryption=function(){var e=t.state,a=e.message,o=e.password,r=o.length-2*o.length;t.handleDecryptionClickStatus();var n=function e(a,t){if(t<0)return e(a,t+26);for(var o="",r=0;r<a.length;r++){var n=a[r];if(n.match(/[A-Z]/)){var s=a.charCodeAt(r);s>=65&&s<=90?n=String.fromCharCode((s-65+t)%26+65):s>=97&&s<=122&&(n=String.fromCharCode((s-97+t)%26+97))}o+=n}return o}(a,r);t.setState({message:n})},t.handleReset=function(){t.setState({password:"",message:"",email:"",checkbox:!1,encryptionClicked:!1,decryptionClicked:!1,passwordValidation:!1,messageValidation:!1,codingValidation:!1,emailValidation:!1,allValidation:!1,showValidationErrors:!1,errorPasswordTooShort:!0,errorPasswordTooLong:!1,errorMessageTooShort:!0,errorMessageTooLong:!1,errorMessageNotCoded:!0,errorEmailIsInvalid:!1,errorcheckbox:!1,showMessageWasSent:!1})},t.handleSend=function(e){var a=t.state,o=a.allValidation,r=a.message,n=a.email;e.preventDefault();var s={message:r,send_to:n};o?(t.setState({showMessageWasSent:!0}),Object(b.a)("service_messagecoding","template_50l63q9",s,"user_ODU8rLD61NH0RQu6lmxOx").then(function(e){console.log("SUCCESS!",e.status,e.text)}).catch(function(e){console.log("FAILED...",e)}),setTimeout(t.handleReset,4e3)):t.showValidationErrors()},t.handleEncryptionClickStatus=function(){t.setState({encryptionClicked:!0,decryptionClicked:!1})},t.handleDecryptionClickStatus=function(){t.setState({encryptionClicked:!1,decryptionClicked:!0})},t.handleCheckbox=function(){t.state.checkbox?t.setState({checkbox:!1}):t.setState({checkbox:!0})},t.codeMessage=function(){var e=t.state,a=e.message,o=e.password.length,r=a.toUpperCase().replace(/\u0104/g,"A").replace(/\u0106/g,"C").replace(/\u0118/g,"E").replace(/\u0141/g,"L").replace(/\u0143/g,"N").replace(/\xd3/g,"O").replace(/\u015a/g,"S").replace(/\u017b/g,"Z").replace(/\u0179/g,"Z").replace(/[A-Z]/g,function(e){return String.fromCharCode((e.charCodeAt(0)-65+o)%26+65)});t.setState({message:r})},t.passwordValidation=function(){var e=t.state.password,a=!1,o=!1;e.length<4&&(a=!0),e.length>=25&&(o=!0),t.setState({errorPasswordTooShort:a,errorPasswordTooLong:o}),a||o?t.setState({passwordValidation:!1}):t.setState({passwordValidation:!0})},t.messageValidation=function(){var e=t.state.message,a=!1,o=!1;e.length>51&&(o=!0),e.length<4&&(a=!0),t.setState({errorMessageTooShort:a,errorMessageTooLong:o}),a||o?t.setState({messageValidation:!1}):t.setState({messageValidation:!0})},t.codingValidation=function(){var e=t.state,a=e.encryptionClicked,o=e.decryptionClicked;a&&!o?t.setState({codingValidation:!0,errorMessageNotCoded:!1}):t.setState({codingValidation:!1,errorMessageNotCoded:!0})},t.emailValidation=function(){var e=t.state.email;e.length>6&&-1!==e.indexOf("@")&&-1!==e.indexOf(".")?t.setState({emailValidation:!0,errorEmailIsInvalid:!1}):t.setState({emailValidation:!1,errorEmailIsInvalid:!0})},t.checkboxValidation=function(){t.state.checkbox?t.setState({errorcheckbox:!1}):t.setState({errorcheckbox:!0})},t.showValidationErrors=function(){t.setState({showValidationErrors:!0})},t.allValidation=function(){var e=t.state,a=e.checkbox,o=e.passwordValidation,r=e.messageValidation,n=e.codingValidation,s=e.emailValidation;a&&o&&r&&n&&s?t.setState({allValidation:!0}):t.setState({allValidation:!1})},t}return Object(d.a)(a,e),Object(l.a)(a,[{key:"componentDidUpdate",value:function(e,a){var t=this,o=this.state,r=o.encryptionClicked,n=o.password,s=o.message,i=o.email,l=o.checkbox,c=o.showValidationErrors,m=o.passwordValidation,d=o.messageValidation,g=o.codingValidation,h=o.emailValidation,u=o.showMessageWasSent;a.password!==n&&this.passwordValidation(),a.message!==s&&this.messageValidation(),a.encryptionClicked!==r&&this.codingValidation(),a.email!==i&&(this.emailValidation(),this.checkboxValidation()),a.checkbox!==l&&this.checkboxValidation(),a.passwordValidation===m&&a.messageValidation===d&&a.codingValidation===g&&a.emailValidation===h&&a.checkbox===l||this.allValidation(),(c||u)&&setTimeout(function(){t.setState({showValidationErrors:!1,showMessageWasSent:!1})},4e3)}},{key:"render",value:function(){var e=this,a=this.state,t=a.errorPasswordTooShort,o=a.errorPasswordTooLong,n=a.errorMessageTooShort,s=a.errorMessageTooLong,i=a.errorMessageNotCoded,l=a.errorEmailIsInvalid,c=a.errorcheckbox,m=a.encryptionClicked,d=a.checkbox,g=a.password,h=a.message,u=a.email,p=a.showValidationErrors,b=a.allValidation,k=a.showMessageWasSent,f="form-control margin text-center",w="form-control margin text-center",v="form-control margin text-center",S="invalid-feedback margin2",y=m?r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btnBreak2",disabled:!0},"Encryption"):r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btnBreak2",onClick:function(){e.handleEncryption(),e.showValidationErrors()}},"Encryption"),V=m?r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btnBreak",onClick:this.handleDecryption},"Decryption"):r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btnBreak",disabled:!0},"Decryption"),x=""!==g||""!==h||""!==u?r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btnBreak2",onClick:this.handleReset},"Reset"):r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btnBreak2",disabled:!0},"Reset");f=p&&t||p&&o?"form-control margin3 text-center is-invalid":"form-control margin text-center",w=p&&n||p&&s||p&&i?"form-control margin3 text-center is-invalid":"form-control margin text-center",v=p&&l?"form-control margin3 text-center is-invalid":"form-control margin text-center",S=k?"margin4 sendMessage":"invalid-feedback margin2";var C=p&&t&&r.a.createElement("center",null,this.messages.errorPasswordTooShort),N=p&&o&&r.a.createElement("center",null,this.messages.errorPasswordTooLong),T=p&&n&&r.a.createElement("center",null,this.messages.errorMessageTooShort),M=p&&s&&r.a.createElement("center",null,this.messages.errorMessageTooLong),I=p&&i&&r.a.createElement("center",null,this.messages.errorMessageNotCoded),O=p&&l&&r.a.createElement("center",null,this.messages.errorEmailIsInvalid),P=p&&c&&r.a.createElement("center",null,this.messages.errorcheckbox),L=k&&b&&r.a.createElement("center",null,this.messages.messageSend);return r.a.createElement("form",{noValidate:!0},r.a.createElement("div",{className:"container"},r.a.createElement("main",{className:"marginTop"},r.a.createElement("div",{className:"row"},r.a.createElement("section",{className:"col col-lg-2 text-right"},r.a.createElement("label",{htmlFor:"exampleInputPassword1",className:"margin"},"Enter the key:")),r.a.createElement("section",{className:"col col-md-4"},r.a.createElement("input",{type:"password",className:f,id:"password","aria-describedby":"inputGroupPrepend3",required:!0,value:this.state.password,onChange:this.handleChange}),r.a.createElement("div",{className:"margin2"},C,N)),r.a.createElement("div",{className:"col col-lg-2"})),r.a.createElement("section",{className:"row"},r.a.createElement("div",{className:"col col-lg-2 text-right"},r.a.createElement("label",{htmlFor:"exampleFormControlTextarea1",className:"margin"},"Message:")),r.a.createElement("div",{className:"col col-md-4"},r.a.createElement("textarea",{className:w,id:"message",rows:"5","aria-describedby":"inputGroupPrepend3",required:!0,value:this.state.message,onChange:this.handleChange}),r.a.createElement("div",{className:"margin2"},T,M,I)),r.a.createElement("div",{className:"col col-lg-2 margin"},y,V,x)),r.a.createElement("section",{className:"row"},r.a.createElement("div",{className:"col col-lg-2 text-right"},r.a.createElement("label",{htmlFor:"exampleInputEmail1",className:"margin"},"E-mail:")),r.a.createElement("div",{className:"col col-md-4"},r.a.createElement("input",{type:"email",className:v,id:"email",required:!0,"aria-describedby":"emailHelp",placeholder:"Send a message to your friend",value:this.state.email,onChange:this.handleChange}),r.a.createElement("div",{className:S},O),r.a.createElement("div",{className:"form-check"},r.a.createElement("input",{type:"checkbox",className:"form-check-input",id:"checkbox",required:!0,onChange:this.handleCheckbox,checked:d}),r.a.createElement("label",{className:"form-check-label",htmlFor:"checkbox"},"I'm not a robot")),r.a.createElement("div",{className:S},L),r.a.createElement("div",{className:"margin2 margin4"},P)),r.a.createElement("div",{className:"col col-lg-2 margin mobile"},r.a.createElement("button",{className:"btn btn-outline-primary btnBreak3",type:"submit",value:"Send",onClick:this.handleSend},"Send"))))),r.a.createElement(E,{correct:k||c&&p}))}}]),a}(o.Component),f=function(e){function a(){return Object(i.a)(this,a),Object(c.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(u,null),r.a.createElement(k,null))}}]),a}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,a,t){e.exports=t.p+"static/media/logo.acd54ad6.png"}},[[11,1,2]]]);
//# sourceMappingURL=main.079d32e2.chunk.js.map