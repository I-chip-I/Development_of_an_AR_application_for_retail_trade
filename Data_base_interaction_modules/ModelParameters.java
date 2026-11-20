package Data_base_interaction_modules;

public class ModelParameters
{
    private String modelPath;
    private double displacement;
    private double modelScale;

    public ModelParameters( String modelPath, double displacement, double modelScale )
    {
        this.modelPath = modelPath;
        this.displacement = displacement;
        this.modelScale = modelScale;
    }

    public String getModelPath()
    {
        return this.modelPath;
    }

    public double getDisplacement()
    {
        return this.displacement;
    }

    public double getModelScale()
    {
        return this.modelScale;
    }
}