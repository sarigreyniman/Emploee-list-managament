using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;



namespace WorkersList.Data.Reposirories
{
    public class PositionRepository: IPositionRepository
    {
        private readonly DataContext _dataContext;

        public PositionRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await Task.FromResult(_dataContext.Positions);
        }

        public async Task<IEnumerable<string>> GetPositionNamesAsync()
        {
            var positionNamesList = Enum.GetNames(typeof(PositionsNames)).ToList();
            return await Task.FromResult(positionNamesList);
        }

       async Task<Position> GetByIdAsync(int id)
        {
            return await _dataContext.Positions.FindAsync(id);
        }

        public async Task<Position> AddAsync(Position position)
        {
            _dataContext.Positions.Add(position);
            await _dataContext.SaveChangesAsync();
            return position;
        }
    
        public async Task<Position> UpdateAsync(int id, Position position)
        {
            Position temp = await GetByIdAsync(id);
            _dataContext.Entry(temp).CurrentValues.SetValues(position);
            await _dataContext.SaveChangesAsync();
            return position;
        }

        public async Task DeleteAsync(int id) {
            var position = await GetByIdAsync(id);
            _dataContext.Positions.Remove(position);
            await _dataContext.SaveChangesAsync();
        }

        Task<Position> IPositionRepository.GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
