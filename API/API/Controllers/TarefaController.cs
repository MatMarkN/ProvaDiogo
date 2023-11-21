using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _context;

    public TarefaController(AppDataContext context) =>
        _context = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


     // GET: api/tarefa/naoconcluidas
    [HttpGet]
    [Route("naoconcluidas")]
    public IActionResult NaoConcluidas()
    {
        try
        {
            List<Tarefa> tarefasNaoConcluidas = _context.Tarefas
                .Where(x => x.Status == "Não iniciada" || x.Status == "Em andamento")
                .Include(x => x.Categoria)
                .ToList();
            return Ok(tarefasNaoConcluidas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

      // GET: api/tarefa/naoconcluidas
    [HttpGet]
    [Route("concluidas")]
    public IActionResult Concluidas()
    {
        try
        {
            List<Tarefa> tarefasConcluidas = _context.Tarefas
                .Where(x => x.Status == "Concluída")
                .Include(x => x.Categoria)
                .ToList();
            return Ok(tarefasConcluidas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _context.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Categoria = categoria;
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
