const Classe = require('../model/classeModel'); // Assurez-vous du bon chemin d'accès à vos modèles
const Departement  = require('../model/departementModel'); 

class ClasseController {
  async createClasse(req, res) {
    const { nom, niveau, departementId } = req.body;
    try {
      // Vérifiez si le département existe
      const existingDepartement = await Departement.findByPk(departementId);
      if (!existingDepartement) {
        return res.status(404).json({ error: 'Département introuvable.' });
      }

      // Créez la classe avec les données fournies
      const newClasse = await Classe.create({ nom, niveau, departementId });
      res.status(201).json(newClasse);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la classe.' });
    }
  }

  async getAllClasses(req, res) {
    try {
      const classes = await Classe.findAll();
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des classes.' });
    }
  }

  async getClasseById(req, res) {
    const { id } = req.params;
    try {
      const classe = await Classe.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: 'Classe introuvable.' });
      }
      res.status(200).json(classe);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de la classe.' });
    }
  }

  async updateClasse(req, res) {
    const { id } = req.params;
    const { nom, niveau, departementId } = req.body;
    try {
      const classe = await Classe.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: 'Classe introuvable.' });
      }

      // Vérifiez si le département existe lors de la mise à jour
      if (departementId) {
        const existingDepartement = await Departement.findByPk(departementId);
        if (!existingDepartement) {
          return res.status(404).json({ error: 'Département introuvable.' });
        }
      }

      // Mettez à jour la classe avec les nouvelles données
      classe.nom = nom || classe.nom;
      classe.niveau = niveau || classe.niveau;
      classe.departementId = departementId || classe.departementId;
      await classe.save();
      res.status(200).json(classe);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la classe.' });
    }
  }
  async deleteClasse(req, res) {
    const { id } = req.params;
    try {
      const classe = await Classe.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: 'Classe introuvable.' });
      }
      await classe.destroy();
      res.status(204).end();
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression : ', error);
      res.status(500).json({ error: 'Erreur lors de la suppression de la classe.' });
    }
  }
  
  async getClasseNameById(req, res) {
    const { id } = req.params;
    try {
      const classe = await Classe.findByPk(id);
      if (!classe) {
        return res.status(404).json({ error: 'Classe introuvable.' });
      }
  
      // Recherchez le nom du département associé à la classe
      const departement = await Departement.findByPk(classe.departementId);
      if (!departement) {
        return res.status(404).json({ error: 'Département introuvable pour la classe.' });
      }
  
      res.status(200).json({ classeId: classe.id, nomClasse: classe.nom, nomDepartement: departement.nom });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la recherche du nom du département.' });
    }
  }
}




module.exports = new ClasseController();
