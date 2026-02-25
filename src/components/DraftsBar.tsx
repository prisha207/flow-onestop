import { useState } from 'react';
import { ChevronUp, ChevronDown, FileText, X, Pencil } from 'lucide-react';
import { useAppContext, Draft } from '@/context/AppContext';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const DraftsBar = () => {
  const { drafts, removeDraft } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [editingDraft, setEditingDraft] = useState<Draft | null>(null);
  const [editBody, setEditBody] = useState('');

  if (drafts.length === 0) return null;

  const handleEdit = (draft: Draft) => {
    setEditingDraft(draft);
    setEditBody(draft.body);
  };

  const handleSend = () => {
    if (!editingDraft) return;
    toast.success(`Reply sent to ${editingDraft.to}`);
    removeDraft(editingDraft.id);
    setEditingDraft(null);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40">
        {/* Expanded drafts list */}
        {expanded && (
          <div className="bg-card border-t border-x border-border rounded-t-xl mx-4 mb-0 max-h-48 overflow-y-auto shadow-lg">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{draft.subject}</p>
                    <p className="text-xs text-muted-foreground">To: {draft.to} · {format(draft.savedAt, 'h:mm a')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleEdit(draft)}
                    className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => { removeDraft(draft.id); toast.success('Draft discarded'); }}
                    className="p-1.5 rounded-md hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collapsed bar */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-6 py-2.5 bg-card border-t border-border text-sm hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">
              Drafts ({drafts.length})
            </span>
          </div>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Edit draft dialog */}
      {editingDraft && (
        <Dialog open={!!editingDraft} onOpenChange={(open) => !open && setEditingDraft(null)}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Draft</DialogTitle>
              <DialogDescription>Continue your reply to {editingDraft.to}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">To</label>
                <Input value={editingDraft.toEmail} readOnly className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input value={editingDraft.subject} readOnly className="bg-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setEditingDraft(null)}>Cancel</Button>
              <Button onClick={handleSend}>Send Reply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DraftsBar;
