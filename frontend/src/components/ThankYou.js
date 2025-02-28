import React, { useState, useEffect } from "react";
import { User, Mail, Building, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

const ThankYou = ({ userData, onContinue }) => {
  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-600">
            Welcome to NxtWave, {userData.firstName}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-6 space-y-6">
            <div className="text-center text-gray-600 mb-8">
              Your account has been successfully verified. Here are your
              details:
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Full Name</div>
                  <div className="font-medium">{`${userData.firstName} ${userData.lastName}`}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{userData.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <Building className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Company</div>
                  <div className="font-medium">{userData.companyName}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Date of Birth</div>
                  <div className="font-medium">
                    {new Date(userData.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={onContinue}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
