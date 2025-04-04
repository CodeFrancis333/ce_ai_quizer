from django.db import models

class QuizQuestion(models.Model):
    CATEGORY_CHOICES = [
        ('Calculus', 'Calculus'),
        ('Differential Equations', 'Differential Equations'),
        ('EDA', 'Engineering Data Analysis'),
        ('Numerical Methods', 'Numerical Methods'),
        ('Physics', 'Physics for Engineers'),
        ('Economics', 'Economics'),
        ('Construction Surveying', 'Construction Surveying and Layout'),
        ('Materials for Construction', 'Materials for Construction'),
        ('Highway', 'Highway Engineering'),
        ('COSH', ' Construction Occupational Safety and Health'),
        ('Transportation', 'Transportation Engineering'),
        ('Quantity Surveying', 'Quantity Surveying'),
        ('CMPM', 'Construction Management Principles and Methods'),
        ('Hydrostatics', 'Hydrostatics'),
        ('Fluid Flow', 'Fluid Flow'),
        ('Buoyancy', 'Buoyancy and Flotation'),
        ('Relative Equilibrium of Liquids', 'Relative Equilibrium of Liquids'),
        ('Hydrodynamics', 'Hydrodynamics'),
        ('Water Supply', 'Water Supply Soil Properties'),
        ('Soils Classification', 'Soils Classification'),
        ('Soil Fluid Flow', 'Fluid Flow through Soil Mass'),
        ('Soil Stresses', 'Stresses in Soil Mass'),
        ('Soil Strength and Tests', 'Soil Strength and Tests'),
        ('Bearing Capacity', 'Bearing Capacity'),
        ('Consolidation', 'Consolidation and Settlement'),
        ('Compaction', 'Compaction'),
        ('Earth Pressure', 'Lateral Earth Pressure'),
        ('Slope Stability', 'Slope Stability'),
        ('Engineering Mechanics', 'Engineering Mechanics'),
        ('Strema', 'Strength of Materials'),
        ('TOS', 'Theory of Structures'),
        ('Reinforced Concrete Design', 'Reinforced Concrete Structures'),
        ('Prestressed Concrete Design', 'Prestressed Concrete Beams'),
        ('Steel Design', 'Steel Structures'),
        ('Steel Connection Design', 'Steel Connection Design'),
        ('Footing', 'Foundation Design'),
        ('CMT', 'Construction Materials Testing'),
        ('NSCP2015', 'Application of the Governing Codes of Practice NSCP2015'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    question = models.TextField()
    option_a = models.TextField()
    option_b = models.TextField()
    option_c = models.TextField()
    option_d = models.TextField()
    correct_answer = models.CharField(max_length=1)  # 'A', 'B', 'C', or 'D'
    solution = models.TextField(blank=True, null=True)  # For AI-generated step-by-step solution
    image_url = models.URLField(blank=True, null=True)  # Optional: URL for a quiz diagram

    def __str__(self):
        return self.question[:50]
