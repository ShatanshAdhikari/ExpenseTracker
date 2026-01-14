from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Expense, Budget
from .serializers import ExpenseSerializer, BudgetSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    @action(detail=False, methods=['get'])
    def by_month(self,request):
        month = request.query_params.get('month')
        if month:
            expenses= self.quesryset.filter(date__month=month)
            serializer= self.get_serializer(expenses, many=True)
            return Response(serializer.data)
        return Response({'error': 'Month parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
    
class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        budgets_data = request.data.get('budgets', {})
        for category, amount in budgets_data.items():
            Budget.objects.update_or_create(
                category=category,
                defaults={'amount': amount}
            )
        return Response({'message': 'Budgets updated successfully'})
    