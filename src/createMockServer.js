import { createServer } from 'miragejs';
import searchResult from './search-result.json';

const createMockServer = () => {
    return createServer({
        routes() {
            this.urlPrefix = 'http://api.openweathermap.org';
            
            this.get('/geo/1.0/direct', (schema, request) => {
                const { q } = request.queryParams;
                
                const filteredResults = searchResult.filter(city =>
                    city.name.toLowerCase().includes(q.toLowerCase())
                );

                return filteredResults.length ? filteredResults : searchResult;
            });
        }
    });
};

export { createMockServer };
