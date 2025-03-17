
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Shield, Cog, User, AlertTriangle, Layers, HelpCircle } from "lucide-react";
import { useGetSupportTickets } from "@/hooks/use-support";
import { useEffect, useState } from "react";

export default function AdminSettings() {
  const { tickets, getTickets } = useGetSupportTickets();
  const [stats, setStats] = useState({
    totalTickets: 0,
    resolvedTickets: 0,
    openTickets: 0,
    responseRate: 0,
    avgResponseTime: '0h'
  });
  
  useEffect(() => {
    getTickets();
  }, []);
  
  useEffect(() => {
    if (tickets.length > 0) {
      // Calculate stats
      const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
      const openTickets = tickets.filter(t => t.status === 'open').length;
      const ticketsWithReplies = tickets.filter(t => t.replies && t.replies.length > 0).length;
      
      // Calculate response rate (% of tickets with at least one reply)
      const responseRate = tickets.length > 0 
        ? Math.round((ticketsWithReplies / tickets.length) * 100) 
        : 0;
      
      // Calculate average response time (mock data for now)
      // In a real app, we would calculate the time between ticket creation and first admin reply
      const avgResponseTime = '2h 15m';
      
      setStats({
        totalTickets: tickets.length,
        resolvedTickets,
        openTickets,
        responseRate,
        avgResponseTime
      });
    }
  }, [tickets]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Layers className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system">
            <Server className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="help">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Rate
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.responseRate}%</div>
                <p className="text-xs text-muted-foreground">
                  of tickets have received a response
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Response Time
                </CardTitle>
                <Cog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                <p className="text-xs text-muted-foreground">
                  from ticket creation to first response
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tickets
                </CardTitle>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTickets}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.resolvedTickets} resolved, {stats.openTickets} open
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Support System</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Operational</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Admin Dashboard</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Operational</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Database Storage</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Using LocalStorage (Temporary)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Authentication</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Basic (Upgrade Recommended)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border p-4 rounded-md bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Security Notice</h3>
                      <p className="text-sm">
                        This is a demonstration system using insecure local storage. In a production environment, you would implement proper authentication and database storage.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  For real-world applications, consider implementing:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Proper authentication system (OAuth, JWT, etc.)</li>
                  <li>Role-based access control for admin accounts</li>
                  <li>Secure database storage with encryption</li>
                  <li>HTTPS and secure cookies</li>
                  <li>Rate limiting and CSRF protection</li>
                  <li>Input validation and sanitization</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Current Storage</h3>
                  <div className="text-sm">
                    <p>Using browser's LocalStorage for data persistence.</p>
                    <p className="mt-1 text-yellow-600 dark:text-yellow-400">
                      Note: LocalStorage is limited to approximately 5MB and is specific to the browser. Data will be lost if browser storage is cleared.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Recommended Improvements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Implement server-side database storage (MongoDB, PostgreSQL, etc.)</li>
                    <li>Add user authentication system</li>
                    <li>Set up API endpoints for secure data operations</li>
                    <li>Implement file upload functionality for attachments</li>
                    <li>Add email notifications for new tickets and replies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help & Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">About This System</h3>
                <p className="text-sm text-muted-foreground">
                  This is a demonstration of a technical support ticket system built with React and ShadCN UI components. It uses browser LocalStorage for data persistence and implements a basic admin interface.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Ticket Management</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>View all tickets in the Tickets section</li>
                  <li>Reply to tickets by opening them and using the reply form</li>
                  <li>Change ticket status using the dropdown in the ticket sidebar</li>
                  <li>Mark tickets as resolved when issues are fixed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Announcements</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Create, edit, and delete announcements from the Announcements section</li>
                  <li>Add images and YouTube videos to announcements</li>
                  <li>Toggle visibility with the publish/unpublish switch</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
