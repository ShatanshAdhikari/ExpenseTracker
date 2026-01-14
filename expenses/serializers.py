from rest_framework import serializers
from .models import Expense, Budget

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'category', 'date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model= Budget
        fields = ['id', 'category', 'amount', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        