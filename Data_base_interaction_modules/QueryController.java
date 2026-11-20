package Data_base_interaction_modules;

public class QueryController
{
    private QueryService queryService;

    public QueryController( QueryService queryService )
    {
        this.queryService = queryService;
    }

    public void handleQuery( String cardNum )
    {   
        ModelParameters modelParameters = queryService.getModelParameters( cardNum );
        
        if ( modelParameters != null ) 
        {
            System.out.println( "Параметры модели найденного товара:" );
            System.out.println( "  Путь к файлу модели: " + modelParameters.getModelPath() );
            System.out.println( "  Смещение: " + modelParameters.getDisplacement() );
            System.out.println( "  Масштаб: " + modelParameters.getModelScale() );
        }
    }
}