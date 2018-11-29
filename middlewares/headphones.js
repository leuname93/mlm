
var request = require('request');
const sItems = require('../models/headphones');

module.exports = {
    getDataBase: function(req, res){
        console.log('hola');
        request('https://api.mercadolibre.com/sites/MLM/search?q=headphones#json', {json:true}, (err, response, body)=>{
            if(err){
                console.log(err);
            }
            var items = [];
            var h = [];

            items = body.results;
        
            var item = items.find(function(element) {

                var obj = {
                    "title": element.title,
                    "price": element.price,
                    "state_name": element.address.state_name,
                    "sold_quantity": element.sold_quantity,
                    "condition": element.condition,
                    "thumbnail": element.thumbnail
                };

                const itm = new sItems(obj);

                itm.save();
                
            });

            res.send({message:'Productos guardados en la base de datos'});
            
        
            
        })

        
    },
    getList: function(req, res){
        sItems.find({}, (err, bags) =>{
            if(err) return res.status(500).send({message:'problemas al realizar la peticion'})
            res.status(200).send(bags)
        });
    },
    getFilter: function(req, res){
        
        const min = parseInt(req.params.minPrice);
        const max = parseInt(req.params.maxPrice);

        sItems.find({price:{$gte:min, $lte:max}}, (err, b)=>{
            if(err) console.log(err);
            if(b.length !== 0){
                res.send(b)
            }else{
                res.send({message:'no se encontraron productos entre el rango de precios'})
            }
        })
    },
    getCondition: function(req, res){
        
        const cond = req.params.condition;
    
        if(cond === "old" || cond === "new"){
            sItems.find({condition:{$eq:cond}}, (err, b)=>{
                if(err) console.log(err);
                
                if(b.length !== 0){
                    res.send(b)
                }else{
                    res.send({message:'no se encontraron productos con esta condicion'})
                }
                
            })
        }
        
    },
    delete: function(req, res){
        let itemId = req.params.itemId;
        
        sItems.findById(itemId, (err, item) =>{
            if(err) res.status(500).send({message:'error al borrar producto'});
            item.remove(err => {
                if(err) res.status(500).send({message:'error al borrar producto'});
                res.status(200).send('producto eliminado')
            })
        })
    }
};




