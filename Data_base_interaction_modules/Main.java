package Data_base_interaction_modules;

public class Main 
{
    public static void main(String[] args) {
        DecorItemRepository decorItemRepository = new DecorItemRepository();
        QueryService queryService = new QueryService( decorItemRepository );
        QueryController queryController = new QueryController( queryService );

        System.out.println( "Тест 1: Найти товар для карточки 000" );
        queryController.handleQuery( "000");
        System.out.println( "Тест 2: Найти товар для карточки 001" );
        queryController.handleQuery( "001");
    }
}