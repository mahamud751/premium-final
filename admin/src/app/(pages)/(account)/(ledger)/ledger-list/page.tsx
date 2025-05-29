"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useAuth } from "@/services/hooks/auth";

// Define TypeScript interfaces for the data structure
interface LedgerEntry {
  date: string;
  particulars: string;
  amount: number;
}

interface LedgerRow {
  debit: LedgerEntry;
  credit: LedgerEntry | null;
}

interface LedgerData {
  ledger: string;
  rows: LedgerRow[];
  totals: {
    debit: LedgerEntry;
    credit: LedgerEntry;
  };
}

interface Account {
  id: string;
  name: string;
}

const LedgersList: React.FC = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("2025-01-01");
  const [toDate, setToDate] = useState<string>("2025-01-31");
  const [ledgers, setLedgers] = useState<LedgerRow[]>([]);
  const [ledgerName, setLedgerName] = useState<string>("Cash");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch chart of accounts for dropdown
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/chart-of-accounts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAccounts(response.data?.data || []);
        if (response.data?.data?.length > 0) {
          setSelectedAccount(response.data.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [token]);

  // Fetch ledger data based on selected account and date range
  useEffect(() => {
    if (selectedAccount && fromDate && toDate) {
      const fetchLedgers = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASEURL}/v1/admin/ledgers?chart_of_account_id=${selectedAccount}&from_date=${fromDate}&to_date=${toDate}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data: LedgerData = response?.data?.data;
          setLedgerName(data.ledger || "Cash");
          // Sort rows by debit and credit dates
          const sortedRows = [...data.rows].sort((a, b) => {
            const debitDateA = new Date(a.debit.date);
            const debitDateB = new Date(b.debit.date);
            const creditDateA = a.credit
              ? new Date(a.credit.date)
              : new Date(0);
            const creditDateB = b.credit
              ? new Date(b.credit.date)
              : new Date(0);

            return (
              debitDateA.getTime() - debitDateB.getTime() ||
              creditDateA.getTime() - creditDateB.getTime()
            );
          });
          setLedgers(sortedRows);
        } catch (error) {
          console.error("Error fetching ledgers:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLedgers();
    }
  }, [selectedAccount, fromDate, toDate, token]);

  // Format date for display (e.g., "01-Jan-25" to "01-Jan-25")
  // const formatDateForDisplay = (date: string): string => {
  //   const parsedDate = new Date(date);
  //   return parsedDate.toLocaleDateString("en-GB", {
  //     day: "2-digit",
  //     month: "short",
  //     year: "2-digit",
  //   });
  // };

  return (
    <div className="container mx-auto p-4">
      {/* <Typography variant="h5" className="mb-4 text-center font-bold">
        {ledgerName} Ledger ({formatDateForDisplay(fromDate)} to{" "}
        {formatDateForDisplay(toDate)})
      </Typography> */}

      {/* Chart of Accounts Dropdown and Date Inputs */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <Select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value as string)}
          displayEmpty
          className="w-full max-w-xs"
          disabled={loading}
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="From Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="w-full max-w-xs"
          disabled={loading}
        />

        <TextField
          label="To Date"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="w-full max-w-xs"
          disabled={loading}
        />
      </div>

      {/* Ledger Table */}
      <Table className="w-full border-collapse">
        <TableHead>
          <TableRow className="bg-green-300 text-white">
            <TableCell className="border border-gray-300 p-2" colSpan={6}>
              {ledgerName}
            </TableCell>
          </TableRow>
          <TableRow className="bg-green-400 text-white">
            <TableCell className="border border-gray-300 p-2">Date</TableCell>
            <TableCell className="border border-gray-300 p-2">Dr</TableCell>
            <TableCell className="border border-gray-300 p-2">Tk</TableCell>
            <TableCell className="border border-gray-300 p-2">Date</TableCell>
            <TableCell className="border border-gray-300 p-2">Cr</TableCell>
            <TableCell className="border border-gray-300 p-2">Tk</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ledgers.length > 0 ? (
            ledgers.map((ledger, index) => (
              <TableRow key={index}>
                <TableCell className="border border-gray-300 p-2">
                  {ledger.debit.date}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {ledger.debit.particulars}
                </TableCell>
                <TableCell
                  className={`border border-gray-300 p-2 ${
                    ledger.debit.particulars === "Balance B/D"
                      ? "bg-cyan-200"
                      : "bg-white"
                  }`}
                >
                  {ledger.debit.amount}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {ledger.credit?.date || ""}
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  {ledger.credit?.particulars || ""}
                </TableCell>
                <TableCell
                  className={`border border-gray-300 p-2 ${
                    ledger.credit?.particulars === "Balance C/D"
                      ? "bg-cyan-200"
                      : "bg-white"
                  }`}
                >
                  {ledger.credit?.amount || ""}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="border border-gray-300 p-2 text-center"
              >
                {loading ? "Loading..." : "No data available"}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-300 p-2">
              Total
            </TableCell>
            <TableCell className="border border-gray-300 p-2">
              {ledgers.reduce((sum, l) => sum + l.debit.amount, 0)}
            </TableCell>
            <TableCell colSpan={2} className="border border-gray-300 p-2" />
            <TableCell className="border border-gray-300 p-2">
              {ledgers.reduce((sum, l) => sum + (l.credit?.amount || 0), 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default LedgersList;
