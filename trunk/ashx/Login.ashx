<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;

public class Login : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string strEMail = context.Request.Form["email"];
        
        //
        string strRet = "{success:true, data:{addDir:{disabled:true}}}";
        if (strEMail != "a")
            strRet = "{success:true, data:{addDir:{disabled:false}}}";
        
        //
        context.Response.ContentType = "text/plain";
        context.Response.Write(strRet);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}