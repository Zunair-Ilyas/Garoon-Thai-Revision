import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardApi, type Subscription as Sub, type Message as Msg, type Restaurant as Rest, type ContactSettings as Contact } from "../services/dashboard";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, Mail as MailIcon, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

type Tab = "subscriptions" | "messages" | "contact" | "restaurants";

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>("subscriptions");
  const { logout, user } = useAuth();
  const [subsCount, setSubsCount] = useState(0);
  const [msgsCount, setMsgsCount] = useState(0);
  const [restsCount, setRestsCount] = useState(0);

  useEffect(() => {
    // Load counts for stat cards
    (async () => {
      try {
        const [subs, msgs, rests] = await Promise.all([
          dashboardApi.getSubscriptions(),
          dashboardApi.getMessages(),
          dashboardApi.ensureSeedRestaurants(),
        ]);
        setSubsCount(subs.length);
        setMsgsCount(msgs.length);
        setRestsCount(rests.length);
      } catch (e) {
        // best-effort; per-tab error handling covers details
      }
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage contacts, restaurants, and inbound messages</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to website
            </Link>
          </Button>
          <span className="hidden sm:inline text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="outline" onClick={logout}>Log out</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{subsCount}</div>
            <p className="text-xs text-muted-foreground">Newsletter sign-ups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{msgsCount}</div>
            <p className="text-xs text-muted-foreground">Contact form inquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{restsCount}</div>
            <p className="text-xs text-muted-foreground">Locations configured</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="mb-4 flex flex-wrap gap-2">
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            Subscriptions <Badge variant="secondary">{subsCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            Messages <Badge variant="secondary">{msgsCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            Restaurants <Badge variant="secondary">{restsCount}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <SubscriptionsTab />
        </TabsContent>
        <TabsContent value="messages">
          <MessagesTab onChangedCount={setMsgsCount} />
        </TabsContent>
        <TabsContent value="contact">
          <ContactTab />
        </TabsContent>
        <TabsContent value="restaurants">
          <RestaurantsTab onChangedCount={setRestsCount} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SubscriptionsTab: React.FC = () => {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await dashboardApi.getSubscriptions();
        setSubs(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load subscriptions";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscribed Users</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subs.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.email}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{new Date(s.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {subs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-sm text-muted-foreground">No subscriptions.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

const MessagesTab: React.FC<{ onChangedCount?: (n: number) => void }> = ({ onChangedCount }) => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMsg, setViewMsg] = useState<Msg | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await dashboardApi.getMessages();
        setMsgs(data);
        onChangedCount?.(data.length);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load messages";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [onChangedCount]);

  const replyHref = (m: Msg) => {
    const subj = `Re: ${m.subject || "Your inquiry"}`;
    const body = `Hi ${m.name},%0D%0A%0D%0A`;
    return `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(subj)}&body=${body}`;
  };

  const confirmDelete = (id: string) => setDeleteId(id);

  const performDelete = async () => {
    if (!deleteId) return;
    try {
      await dashboardApi.deleteMessage(deleteId);
      const next = msgs.filter(m => m.id !== deleteId);
      setMsgs(next);
      onChangedCount?.(next.length);
      toast({ title: "Message deleted" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to delete message";
      toast({ title: "Delete failed", description: msg, variant: "destructive" });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {msgs.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell className="text-muted-foreground">{m.subject || "—"}</TableCell>
                    <TableCell className="max-w-[420px] truncate" title={m.message}>{m.message}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{new Date(m.created_at).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setViewMsg(m)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={replyHref(m)}>
                            <MailIcon className="h-4 w-4 mr-1" /> Reply
                          </a>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete(m.id)}>
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={performDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {msgs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-sm text-muted-foreground">No messages.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* View dialog */}
      <Dialog open={!!viewMsg} onOpenChange={(open) => !open && setViewMsg(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {viewMsg?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div><span className="text-muted-foreground">Email:</span> {viewMsg?.email}</div>
            <div><span className="text-muted-foreground">Subject:</span> {viewMsg?.subject || "—"}</div>
            <div><span className="text-muted-foreground">Date:</span> {viewMsg ? new Date(viewMsg.created_at).toLocaleString() : ""}</div>
            <div className="pt-3 whitespace-pre-wrap">{viewMsg?.message}</div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            {viewMsg && (
              <Button variant="outline" asChild>
                <a href={replyHref(viewMsg)}><MailIcon className="h-4 w-4 mr-1" /> Reply</a>
              </Button>
            )}
            <Button onClick={() => setViewMsg(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ContactTab: React.FC = () => {
  const [form, setForm] = useState<Contact>({ id: 1, phone: "", email: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await dashboardApi.getContact();
        setForm(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load contact details";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await dashboardApi.updateContact({
        phone: form.phone,
        email: form.email,
        address: form.address,
      });
      setForm(updated);
      toast({ title: "Contact details saved" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to save contact details";
      setError(msg);
      toast({ title: "Failed to save", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {error && <div className="text-sm text-red-500 mb-3">{error}</div>}
        {!loading && (
          <form onSubmit={onSave} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <Input value={form.phone ?? ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <Input value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

const RestaurantsTab: React.FC<{ onChangedCount?: (n: number) => void }> = ({ onChangedCount }) => {
  const [list, setList] = useState<Rest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await dashboardApi.ensureSeedRestaurants();
        setList(data);
        onChangedCount?.(data.length);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load restaurants";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [onChangedCount]);

  const onChange = (id: string, field: "name" | "address" | "description", value: string) => {
    setList(prev => prev.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };
  const onSave = async (id: string) => {
    const item = list.find(r => r.id === id);
    if (!item) return;
    setSavingId(id);
    try {
      const updated = await dashboardApi.updateRestaurant(item);
      setList(prev => prev.map(r => (r.id === id ? updated : r)));
      toast({ title: "Restaurant saved" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to save restaurant";
      setError(msg);
      toast({ title: "Failed to save", description: msg, variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {!loading && list.map(r => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle>{r.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <Input value={r.name} onChange={(e) => onChange(r.id, "name", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-1">Address</label>
                <Input value={r.address ?? ""} onChange={(e) => onChange(r.id, "address", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <Textarea rows={3} value={r.description ?? ""} onChange={(e) => onChange(r.id, "description", e.target.value)} />
            </div>
            <Button onClick={() => onSave(r.id)} disabled={savingId === r.id}>
              {savingId === r.id ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        </Card>
      ))}
      {!loading && list.length === 0 && <div className="text-sm text-muted-foreground">No restaurants configured.</div>}
    </div>
  );
};

export default Dashboard;
