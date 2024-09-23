import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type BookModalProps = {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
};

export const BookModal: React.FC<BookModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>{book.title || "No Title Available"}</DialogTitle>
          <DialogDescription>
            {book.authors?.join(", ") || "Unknown Author"} /{" "}
            {book.categories?.join(", ") || "No Categories"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <img
              src={book.thumbnail || "https://via.placeholder.com/150x210"}
              alt={book.title || "No Thumbnail"}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <p className="text-sm pt-4">
              {book.description || "No Description Available"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
