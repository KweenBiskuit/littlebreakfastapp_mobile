db.getCollection('shoppingcarts').find({})

db.shoppingcarts.update(
  { "_id" : ObjectId("573f1804ff28e6584245f518")},
  { $pull: { items : { price: "6.00" } } },
  { multi: true }
)
