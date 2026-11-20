package Data_base_interaction_modules;

public class QueryService
{
    private DecorItemRepository decorItemRepository;

    public QueryService( DecorItemRepository repository )
    {
        this.decorItemRepository = repository;
    }

    public ModelParameters getModelParameters( String cardNum )
    {
        ModelParameters modelParameters = decorItemRepository.findDecorItemData( cardNum );
        
        if ( modelParameters == null )
        {
            System.out.println( "Товар не найден. Тест 1 пройден." );
            return null;
        }
        
        System.out.println( "Товар найден. Тест 2 пройден." );
        return modelParameters;
    }
}