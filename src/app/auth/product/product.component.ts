import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from 'src/app/admin/product-detail/product-detail.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  perpustakaans:any={};
  userData:any = {};
  constructor(
    public dialog:MatDialog,
    public auth:AngularFireAuth,
    public db :AngularFirestore
  ) {

   }

  ngOnInit(): void {
    this.title='Buku';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getPerpustakaans();
    })
  }

  loading:boolean | undefined;
  getPerpustakaans()
  {
    this.loading=true;
    this.db.collection('perpustakaans',ref=>{
      return ref.where('uid','==',this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(result=>{
      console.log(result);
      this.perpustakaans=result;
      this.loading=false;
    },error=>{
      this.loading=false;
    });
  }


    ProductDetail(data: any,idx: number)
    {
      let dialog= this.dialog.open(ProductDetailComponent, {
          width: '400px',
          data: data,
      });
        dialog.afterClosed().subscribe(result=> {
        return;
        });
      }


      loadingDelete:any={};
      DeleteProduct(id: any,idx: any)
      {
        var conf=confirm('Delete item?');
        if(conf)
        {
          this.db.collection('perpustakaans').doc(id).delete().then(result=>{
            this.perpustakaans.splice(idx,1);
            this.loadingDelete[idx]=false;
          }).catch(error=>{
            this.loadingDelete[idx]=false;
            alert('Tidak dapat menghapus data');
          });
        }
      }
      
    }