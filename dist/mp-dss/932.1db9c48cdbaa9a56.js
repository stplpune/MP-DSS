"use strict";(self.webpackChunkMP_DSS=self.webpackChunkMP_DSS||[]).push([[932],{6666:(K,p,a)=>{a.r(p),a.d(p,{LoginComponent:()=>b});var _=a(6814),r=a(6223),c=a(2296),E=a(5195),g=a(3680),C=a(8034),s=a(9157),u=a(617),d=a(2032),P=a(8525),h=a(2844),v=a(6346),f=a(4494),D=a(2939),t=a(5879),T=a(3146),M=a(2922),O=a(4828);function U(n,m){1&n&&(t.TgZ(0,"span"),t._uU(1,"Please Enter User Name"),t.qZA())}function I(n,m){1&n&&(t.TgZ(0,"span"),t._uU(1,"Please Enter Password"),t.qZA())}function Z(n,m){1&n&&(t.TgZ(0,"span"),t._uU(1,"Please Enter Valid Password"),t.qZA())}function L(n,m){1&n&&(t.TgZ(0,"span"),t._uU(1,"Please Enter Captcha"),t.qZA())}let b=(()=>{class n{constructor(i,o,e,l,A,S,B){this.fb=i,this.commonService=o,this.apiService=e,this.errorService=l,this.validationService=A,this.spinner=S,this.router=B,this.hide=!0}ngOnInit(){this.defultForm()}ngAfterViewInit(){this.generateCaptcha()}defultForm(){this.loginForm=this.fb.group({userName:["",r.kI.required],password:["",[r.kI.required,r.kI.pattern(this.validationService.password)]],captcha:["",[r.kI.required,r.kI.maxLength(4),r.kI.minLength(4)]]})}get loginFC(){return this.loginForm.controls}generateCaptcha(){this.loginForm.controls.captcha.setValue(""),this.commonService.createCaptchaCarrerPage()}onSubmit(){let o={userName:this.loginForm.value.userName,password:this.loginForm.value.password};if(!this.loginForm.invalid){if(this.loginForm.value.captcha!=this.commonService.checkvalidateCaptcha())return this.commonService.snackBar("Invalid Captcha",1),void this.generateCaptcha();this.spinner.show(),this.apiService.setHttp("POST","MP/UserMaster/UserLogin",!0,o,!1,"mpDssBaseUrl"),this.apiService.getHttp().subscribe({next:e=>{200==e.statusCode?(this.spinner.hide(),this.commonService.snackBar(e.statusMessage,0),sessionStorage.setItem("loggedIn","true"),this.loginData=this.commonService.encrypt(JSON.stringify(e.responseData)),localStorage.setItem("loggedInData",this.loginData),this.router.navigate(["Dashboard"])):(this.spinner.hide(),this.commonService.checkEmptyData(e.statusMessage)?this.commonService.snackBar(e.statusMessage,1):this.errorService.handelError(e.statusCode))},error:e=>{this.spinner.hide(),this.errorService.handelError(e.status)}})}}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(r.qu),t.Y36(v.$),t.Y36(h.s),t.Y36(f.r),t.Y36(T.R),t.Y36(M.t2),t.Y36(O.F0))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],standalone:!0,features:[t._Bn([v.$,h.s,f.r,_.uU,{provide:g.Ad,useValue:"en-GB"}]),t.jDz],decls:43,vars:9,consts:[[1,"login-wrapper"],[1,"container"],[1,"row","justify-content-center"],[1,"col-sm-4"],[1,"card"],[1,"card-header","border-0","bg-transparent","p-2"],[1,"text-center","border-bottom","pb-2","mb-0"],[1,"card-body","pt-2","p-3"],[1,"form-container","text-start",3,"formGroup","ngSubmit"],[1,"mb-0"],[1,"form-label"],["appearance","outline","autocomplete","off",1,"w-100"],["matInput","","autofocus","","placeholder","User Name","maxlength","30","formControlName","userName"],[1,"text-danger"],[4,"ngIf"],["appearance","outline",1,"w-100"],["matInput","","placeholder","Password","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],[1,"material-symbols-rounded"],[1,"row","g-3"],[1,"col-sm-6"],[1,"d-flex","gap-2"],["id","captcha"],["mat-flat-button","","type","button",1,"btn-main","btn-icon",3,"click"],["matInput","","placeholder","Enter Captcha","maxlength","4","formControlName","captcha"],["mat-flat-button","","type","submit",1,"w-100","btn-main","fs-main"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h4",6),t._uU(7,"Login"),t.qZA()(),t.TgZ(8,"div",7)(9,"form",8),t.NdJ("ngSubmit",function(){return e.onSubmit()}),t.TgZ(10,"div",9)(11,"label",10),t._uU(12,"User Name"),t.qZA(),t.TgZ(13,"mat-form-field",11),t._UZ(14,"input",12),t.TgZ(15,"mat-error",13),t.YNc(16,U,2,0,"span",14),t.qZA()()(),t.TgZ(17,"div",9)(18,"label",10),t._uU(19,"Password"),t.qZA(),t.TgZ(20,"mat-form-field",15),t._UZ(21,"input",16),t.TgZ(22,"button",17),t.NdJ("click",function(){return e.hide=!e.hide}),t.TgZ(23,"mat-icon",18),t._uU(24),t.qZA()(),t.TgZ(25,"mat-error",13),t.YNc(26,I,2,0,"span",14),t.YNc(27,Z,2,0,"span",14),t.qZA()()(),t.TgZ(28,"div",19)(29,"div",20)(30,"div",21),t._UZ(31,"div",22),t.TgZ(32,"button",23),t.NdJ("click",function(){return e.generateCaptcha()}),t.TgZ(33,"mat-icon",18),t._uU(34," autorenew "),t.qZA()()()(),t.TgZ(35,"div",20)(36,"mat-form-field",11),t._UZ(37,"input",24),t.TgZ(38,"mat-error",13),t.YNc(39,L,2,0,"span",14),t._UZ(40,"span"),t.qZA()()()(),t.TgZ(41,"button",25),t._uU(42," Login "),t.qZA()()()()()()()()),2&o&&(t.xp6(9),t.Q6J("formGroup",e.loginForm),t.xp6(7),t.Q6J("ngIf",e.loginFC.userName.hasError("required")),t.xp6(5),t.Q6J("type",e.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",e.hide),t.xp6(2),t.Oqu(e.hide?"visibility_off":"visibility"),t.xp6(2),t.Q6J("ngIf",e.loginFC.password.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.loginFC.password.hasError("pattern")),t.xp6(12),t.Q6J("ngIf",e.loginFC.captcha.hasError("required")))},dependencies:[_.ez,_.O5,E.QW,u.Ps,u.Hw,c.ot,c.lW,c.RK,s.lN,s.KE,s.TO,s.R9,P.LD,d.c,d.Nt,C.FA,g.XK,r.u5,r._Y,r.Fj,r.JJ,r.JL,r.nD,r.UX,r.sg,r.u,D.ZX],styles:[".login-wrapper[_ngcontent-%COMP%]{height:100vh;display:flex;align-items:center;background-image:url(new-login.1dad2d3d732401c3.png);background-position:center;background-size:cover}#captcha[_ngcontent-%COMP%]{background-image:url(captcha_bg.bbb85fa79566f4e8.jpg);border-radius:5px}"]})}return n})()}}]);