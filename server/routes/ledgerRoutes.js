import express from "express";

import {
  createLedger,
  getDebtors,
  getCreditors,
  createChallan,
  getChallanDetails,
  getAllChallans,
} from "../controller/ledgerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/createledger").post(protect, createLedger);
router.route("/getdebtors/:id").get(protect, getDebtors);
router.route("/getcreditors/:id").get(protect, getCreditors);
router.route("/createchallan").post(protect, createChallan);
router.route("/getChallanDetails/:challanId").get(protect, getChallanDetails);
router.route("/getAllChallans/:firmId").get(protect, getAllChallans);

export default router;
