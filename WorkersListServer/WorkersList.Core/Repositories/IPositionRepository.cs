using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.Repositories
{
    public interface IPositionRepository
    {
       Task<IEnumerable<Position>> GetAllAsync();

        Task<Position> GetByIdAsync(int id);

        Task<IEnumerable<string>> GetPositionNamesAsync();

        Task<Position> AddAsync(Position position);

        Task<Position> UpdateAsync(int id,Position position);

        Task DeleteAsync(int id);
    }
}


