import express from "express";

import {
  createLedger,
  getDebtors,
  getCreditors,
  createChallan,
  getChallanDetails,
  getAllChallans,
  getDebitEntry,
  addCreditEntry,
  getStatement,
  getChallanDetail,
  editChallan,
  deleteChallan,
} from "../controller/ledgerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/createledger").post(protect, createLedger);
router.route("/getdebtors/:id").get(protect, getDebtors);
router.route("/getdebitentry/:firmId/:clientId").get(protect, getDebitEntry);
router.route("/getcreditors/:id").get(protect, getCreditors);
router.route("/createchallan").post(protect, createChallan);
router.route("/editChallan").put(protect, editChallan);
router.route("/challanDetail/:challanId").get(protect, getChallanDetail);
router.route("/deleteChallan/:challanId").delete(protect, deleteChallan);
router.route("/getChallanDetails/:challanId").get(protect, getChallanDetails);
router.route("/getAllChallans/:firmId").get(protect, getAllChallans);
router.route("/addcreditentry").post(protect, addCreditEntry);
router.route("/statement/:firmId/:clientId").get(protect, getStatement);

export default router;
