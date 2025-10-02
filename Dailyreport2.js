import React, { useState } from 'react';
import { Printer, Download, Plus, Trash2 } from 'lucide-react';

export default function DailyAccountsReport() {
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [payments, setPayments] = useState([{ id: 1, bank: 'Meezan Bank', chequeNo: '', recipient: '', amount: '' }]);
  const [chequeInventory, setChequeInventory] = useState({
    'Meezan Bank': '',
    'Bank Alhabib': '',
    'Bank Alfalah': '',
    'United Bank Limited': ''
  });
  const [invoices, setInvoices] = useState('');
  const [attendance, setAttendance] = useState({
    'Inam ur Rehman Ansari': [],
    'Ebad ur Rehman': [],
    'Talha Siddiqui': [],
    'Asad Anwar Khan': []
  });

  const banks = ['Meezan Bank', 'Bank Alhabib', 'Bank Alfalah', 'United Bank Limited'];
  const attendanceOptions = ['Office', 'Warehouse', 'Field', 'Medical Leave', 'Leave', 'Absent'];
  const staff = ['Inam ur Rehman Ansari', 'Ebad ur Rehman', 'Talha Siddiqui', 'Asad Anwar Khan'];

  const addPayment = () => {
    setPayments([...payments, { id: Date.now(), bank: 'Meezan Bank', chequeNo: '', recipient: '', amount: '' }]);
  };

  const removePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const updatePayment = (id, field, value) => {
    setPayments(payments.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleAttendance = (person, status) => {
    setAttendance(prev => ({
      ...prev,
      [person]: prev[person].includes(status)
        ? prev[person].filter(s => s !== status)
        : [...prev[person], status]
    }));
  };

  const formatCurrency = (amount) => {
    return amount ? `PKR ${parseFloat(amount).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'PKR 0.00';
  };

  const getTotalPayments = () => {
    return payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">A.T Commodities</h1>
              <p className="text-slate-600 text-sm mt-1">Coal & Mineral Trading</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-slate-700">Daily Accounts Report</h2>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="mt-2 px-3 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0"
              />
            </div>
          </div>
          
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <Printer size={18} />
              Print Report
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Daily Payment Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:break-inside-avoid">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-blue-600 pb-2">
            1. Daily Payment Overview
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold text-slate-700">Bank Name</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Cheque No.</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Recipient</th>
                  <th className="text-right p-3 font-semibold text-slate-700">Amount (PKR)</th>
                  <th className="w-12 print:hidden"></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr key={payment.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3">
                      <select
                        value={payment.bank}
                        onChange={(e) => updatePayment(payment.id, 'bank', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0"
                      >
                        {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={payment.chequeNo}
                        onChange={(e) => updatePayment(payment.id, 'chequeNo', e.target.value)}
                        placeholder="Cheque #"
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={payment.recipient}
                        onChange={(e) => updatePayment(payment.id, 'recipient', e.target.value)}
                        placeholder="Recipient name"
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={payment.amount}
                        onChange={(e) => updatePayment(payment.id, 'amount', e.target.value)}
                        placeholder="0.00"
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent print:border-0"
                      />
                    </td>
                    <td className="p-3 print:hidden">
                      {payments.length > 1 && (
                        <button
                          onClick={() => removePayment(payment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-200 font-bold">
                  <td colSpan="3" className="p-3 text-right">Total Payments:</td>
                  <td className="p-3 text-right text-blue-700">{formatCurrency(getTotalPayments())}</td>
                  <td className="print:hidden"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <button
            onClick={addPayment}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm print:hidden"
          >
            <Plus size={16} />
            Add Payment
          </button>
        </div>

        {/* Cheque Inventory Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:break-inside-avoid">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-green-600 pb-2">
            2. Cheque Inventory Status
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banks.map(bank => (
              <div key={bank} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className="font-medium text-slate-700">{bank}:</span>
                <input
                  type="number"
                  value={chequeInventory[bank]}
                  onChange={(e) => setChequeInventory({ ...chequeInventory, [bank]: e.target.value })}
                  placeholder="0"
                  className="w-20 px-2 py-1 border border-slate-300 rounded text-sm text-center focus:ring-2 focus:ring-green-500 focus:border-transparent print:border-0"
                />
                <span className="text-slate-600 text-sm">cheques</span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Activity Log */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none print:break-inside-avoid">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-purple-600 pb-2">
            3. Invoice Activity Log
          </h3>
          
          <textarea
            value={invoices}
            onChange={(e) => setInvoices(e.target.value)}
            placeholder="Enter invoice numbers (e.g., INV-2024-001, INV-2024-002, INV-2024-003)"
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent print:border-0"
            rows="4"
          />
          
          {invoices && (
            <div className="mt-3 p-3 bg-purple-50 rounded">
              <p className="text-sm font-semibold text-slate-700 mb-2">Invoices Issued Today:</p>
              <div className="flex flex-wrap gap-2">
                {invoices.split(',').map((inv, idx) => (
                  inv.trim() && (
                    <span key={idx} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-medium">
                      {inv.trim()}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Staff Attendance Record */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:shadow-none">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-orange-600 pb-2">
            4. Staff Attendance Record
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold text-slate-700">Personnel</th>
                  {attendanceOptions.map(opt => (
                    <th key={opt} className="text-center p-3 font-semibold text-slate-700 text-xs">{opt}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((person, idx) => (
                  <tr key={person} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 font-medium text-slate-700">{person}</td>
                    {attendanceOptions.map(opt => (
                      <td key={opt} className="text-center p-3">
                        <input
                          type="checkbox"
                          checked={attendance[person].includes(opt)}
                          onChange={() => toggleAttendance(person, opt)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 print:appearance-none print:border print:border-slate-400"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 text-sm pb-4 print:mt-8">
          <p>Generated on {new Date().toLocaleString('en-PK', { dateStyle: 'full', timeStyle: 'short' })}</p>
          <p className="mt-1">A.T Commodities - Daily Operations Report</p>
        </div>
      </div>

      <style>{`
        @media print {
          body { 
            margin: 0;
            padding: 0;
          }
          @page {
            margin: 1cm;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          input, select, textarea {
            border: none !important;
            background: transparent !important;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          input[type="checkbox"]:checked::after {
            content: "✓";
            display: block;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
          }
        }
      `}</style>
    </div>
  );
}