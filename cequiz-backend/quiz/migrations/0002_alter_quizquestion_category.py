# Generated by Django 5.2 on 2025-04-04 04:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quizquestion',
            name='category',
            field=models.CharField(choices=[('Calculus', 'Calculus'), ('Differential Equations', 'Differential Equations'), ('EDA', 'Engineering Data Analysis'), ('Numerical Methods', 'Numerical Methods'), ('Physics', 'Physics for Engineers'), ('Economics', 'Economics'), ('Construction Surveying', 'Construction Surveying and Layout'), ('Materials for Construction', 'Materials for Construction'), ('Highway', 'Highway Engineering'), ('COSH', ' Construction Occupational Safety and Health'), ('Transportation', 'Transportation Engineering'), ('Quantity Surveying', 'Quantity Surveying'), ('CMPM', 'Construction Management Principles and Methods'), ('Hydrostatics', 'Hydrostatics'), ('Fluid Flow', 'Fluid Flow'), ('Buoyancy', 'Buoyancy and Flotation'), ('Relative Equilibrium of Liquids', 'Relative Equilibrium of Liquids'), ('Hydrodynamics', 'Hydrodynamics'), ('Water Supply', 'Water Supply Soil Properties'), ('Soils Classification', 'Soils Classification'), ('Soil Fluid Flow', 'Fluid Flow through Soil Mass'), ('Soil Stresses', 'Stresses in Soil Mass'), ('Soil Strength and Tests', 'Soil Strength and Tests'), ('Bearing Capacity', 'Bearing Capacity'), ('Consolidation', 'Consolidation and Settlement'), ('Compaction', 'Compaction'), ('Earth Pressure', 'Lateral Earth Pressure'), ('Slope Stability', 'Slope Stability'), ('Engineering Mechanics', 'Engineering Mechanics'), ('Strema', 'Strength of Materials'), ('TOS', 'Theory of Structures'), ('Reinforced Concrete Design', 'Reinforced Concrete Structures'), ('Prestressed Concrete Design', 'Prestressed Concrete Beams'), ('Steel Design', 'Steel Structures'), ('Steel Connection Design', 'Steel Connection Design'), ('Footing', 'Foundation Design'), ('CMT', 'Construction Materials Testing'), ('NSCP2015', 'Application of the Governing Codes of Practice NSCP2015')], max_length=50),
        ),
    ]
