<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;

public class Login : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string strEMail = context.Request.Form["email"];
        
        //
        
        //
        context.Response.ContentType = "text/plain";
        context.Response.Write("{success:true, data:{addDir:{disabled:true}}}");
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}