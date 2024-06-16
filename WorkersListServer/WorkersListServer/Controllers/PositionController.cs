using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using WorkersList.Core.DTOs;
using WorkersList.Core.Entities;
using WorkersList.Core.Mapping;
using WorkersList.Core.Services;
using WorkersList.Data;
using WorkersListServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkersListServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {

        private readonly IPositionService _positionService;

        private readonly IMapper _mapper;

        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }


        // GET: api/<PositionController>
        [HttpGet("GetPosition")]
        public async Task<ActionResult> Get()
        {
            
            return  Ok(await _positionService.GetAllAsync());
        }

        // GET api/<PositionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            return Ok(await _positionService.GetByIdAsync(id));
        }

        [HttpGet("GetPositionNames")]
        public async Task<ActionResult> GetPositionNamesAsync()
        {
            return Ok( await _positionService.GetPositionNamesAsync());
        }

    


        // POST api/<PositionController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPutModel position)
        {
            return Ok(await _positionService.AddAsync(_mapper.Map<Position>(position)));

        }

        // PUT api/<PositionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PositionPutModel positionPutModel)
        {
            var position = await _positionService.GetByIdAsync(id);
            if (position is null)
            {
                return NotFound();
            }
            _mapper.Map(positionPutModel, position);
            await _positionService.UpdateAsync(id,position);
            position = await _positionService.GetByIdAsync(id);
            return Ok(_mapper.Map<PositionDto>(position));
        }

        // DELETE api/<PositionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            if (position is null)
            {
                return NotFound();
            }
            await _positionService.DeleteAsync(id);
            return NoContent();
        }
    }
}


