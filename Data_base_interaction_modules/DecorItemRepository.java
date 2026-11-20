package Data_base_interaction_modules;

import java.util.Map;

public class DecorItemRepository
{
    private Map<String, ModelParameters> dataBaseSimulation = Map.of( "001", new ModelParameters( "./Models_and_tools/origami_paper_crane_on_string.glb", 2.0, 0.5 ) );

    public ModelParameters findDecorItemData( String cardNum ) 
    {
        return dataBaseSimulation.get( cardNum );
    }
}