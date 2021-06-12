import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FileUploaderComponent } from 'src/app/admin/file-uploader/file-uploader.component';
import { ProductDetailComponent } from 'src/app/admin/product-detail/product-detail.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  books:any=[];
  constructor(
    public dialog:MatDialog,
    public api:ApiService
  ) {

   }

  ngOnInit(): void {
    this.title='Product';
    this.book={
      title:'angular pertama',
      author:'afnanda',
      publisher:'ada aja',
      year:2020,
      isbn:'244242',
      price:3000000
    };
    this.getBooks();
  }

  loading:boolean | undefined;
  getBooks()
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
    })
  /*
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },eror=>{
      this.loading=false;
      alert('ada masalah saat pengambilan data... Coba lagi deh!!!');
    })
    */
  }


    ProductDetail(data: any,idx: number)
    {
      let dialog= this.dialog.open(ProductDetailComponent, {
          width: '400px',
          data: data,
      });
        dialog.afterClosed().subscribe(result=> {
         if(result)
         {
          if(idx==-1)this.books.push(result);
          else this.books[idx]=data;
         }
        });
      }


      loadingDelete:any={};
      DeleteProduct(id: any,idx: any)
      {
        var conf=confirm('Delete item?');
        if(conf)
        this.loadingDelete[idx]=true;
        {
          this.api.delete('books/'+id).subscribe(result=>{
            this.books.splice(idx,1);
            this.loadingDelete[idx]=false;
          },error=>{
            this.loadingDelete[idx]=false;
            alert('Tidak dapat menghapus data');
          });
        }
      }

      Uploadfile(data: any)
      {
        let dialog= this.dialog.open(FileUploaderComponent, {
          width: '400px',
          data: data
      });
        dialog.afterClosed().subscribe(result=> {
        return;
        })
      }
      downloadFile(data:any)
      {
       
       
      }
    }