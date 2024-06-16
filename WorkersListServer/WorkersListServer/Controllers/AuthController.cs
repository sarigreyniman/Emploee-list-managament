﻿//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using WorkersList.Data;
//using WorkersListServer.Models;

//[Route("api/[controller]")]
//[ApiController]
//public class AuthController : ControllerBase
//{
//    private readonly IConfiguration _configuration;
//    private readonly DataContext _dataContext;

//    public AuthController(IConfiguration configuration, DataContext dataContext)
//    {
//        _configuration = configuration;
//        _dataContext = dataContext;
//    }

//    [HttpPost("/api/login")]
//    public IActionResult Login([FromBody] LoginModel loginModel)
//    {
//        if (loginModel.Name == "admin" && loginModel.Password == "12345")
//        {
//            var jwt = CreateJWT(loginModel);
//            return Ok(jwt);
//        }
//        return Unauthorized();
//    }

//    [HttpPost("/api/register")]
//    public IActionResult Register([FromBody] LoginModel loginModel)
//    {

//        var jwt = CreateJWT(loginModel);
//        return Ok(jwt);
//    }

//    private object CreateJWT(LoginModel loginModel)
//    {
//        var claims = new List<Claim>()
//           {
//               new Claim("name", loginModel.Name),
//               new Claim("position","CEO"),
//               new Claim("description","admin")
//           };

//        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
//        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
//        var tokeOptions = new JwtSecurityToken(
//            issuer: _configuration.GetValue<string>("JWT:Issuer"),
//            audience: _configuration.GetValue<string>("JWT:Audience"),
//            claims: claims,
//            expires: DateTime.Now.AddDays(30),
//            signingCredentials: signinCredentials
//        );
//        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
//        return new { Token = tokenString };
//    }

//}