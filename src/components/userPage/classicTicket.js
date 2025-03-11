import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Download, Eye, AlertCircle } from 'lucide-react';






export function ClassicTicket({ ticket, handleDownload }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const defaultBackgroundImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cambridge_University_Coat_Of_Arms.svg/640px-Cambridge_University_Coat_Of_Arms.svg.png"
  
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <div 
            className="w-1/3 bg-cover bg-center"
            style={{backgroundImage: `url(${ticket.formalTicketCollegeBackgroundImage?.url || defaultBackgroundImage})`}}
          />
          <CardContent className="w-2/3 p-4 flex">
            <div className="flex-grow">
              <h3 className="text-lg font-bold mb-2">{ticket.formalEventName}</h3>
              <p className="text-sm text-muted-foreground">{ticket.formalTicketCollege}</p>
            </div>
            <div className="flex flex-col space-y-2 ml-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownload(ticket.formalTicketQRCode.url, ticket.formalTicketQRCode.url.split('/').pop() || '')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View QR
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <img
                    src={ticket.formalTicketQRCode.url}
                    alt="Ticket QR Code"
                    className="w-full"
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }